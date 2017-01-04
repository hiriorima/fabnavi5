import Debug from 'debug';

const FSM = require('../utils/FabnaviStateMachine');
const debug = Debug("fabnavi:actions:keys");

export function handleKeyDown(store) {
  return event => {
    if( event.target.nodeName == "INPUT" || event.target.nodeName == "TEXTAREA") return;
    if(event.metaKey) return 0;
    event.preventDefault();
    event.stopped = true;

    const payload = {
      keyCode : event.keyCode,
      charCode: event.charCode,
      ctrl    : event.ctrlKey,
      alt     : event.altKey,
      meta    : event.metaKey,
      shift   : event.shiftKey,
      type    : "NOT_REGISTER",
    };

    const state = store.getState();
    if(state.frame === "manager") {
      const selector = state.manager.selector;
      payload.selector = selector;
      switch(event.keyCode) {
        case 37:
          if(!selector.openMenu) {
            moveSelector(store, payload, -1, 0);
          }
          break;
        case 39:
          if(!selector.openMenu) {
            moveSelector(store, payload, 1, 0);
          }
          break;
        case 38:
          if(selector.openMenu) {
            moveMenuSelector(store, payload, -1);
          } else {
            moveSelector(store, payload, 0, -1);
          }
          break;
        case 40:
          if(selector.openMenu) {
            moveMenuSelector(store, payload, 1);
          } else {
            moveSelector(store, payload, 0, 1);
          }
          break;
        case 27:
          closeMenu(store, payload);
          break;
        case 13:
          if(selector.openMenu) {
            fireMenuAction(store, payload);
          } else {
            openMenu(store, payload);
          }
          break;
        default:
          break;
      }
    }
    FSM.consume( payload );
  };
}

function fireMenuAction(store, action) {
  action.type = "FIRE_MENU_ACTION";
  store.dispatch(action);
}

function openMenu(store, action) {
  action.selector.openMenu = true;
  action.selector.menuIndex = 0;
  action.type = "SELECT_PROJECT_MENU";
  store.dispatch(action);
}

function closeMenu(store, action) {
  action.selector.openMenu = false;
  action.type = "SELECT_PROJECT_MENU";
  store.dispatch(action);
}

function moveMenuSelector(store, action, index) {
  // TODO: sanitize menu index.
  action.selector.menuIndex = action.selector.menuIndex + index;
  action.type = "SELECT_PROJECT_MENU";
  store.dispatch(action);
}

function moveSelector(store, action, x, y) {
  // TODO: sanitize col and row.
  const selector = action.selector;
  let col = selector.col + x, row = selector.row + y;
  if( col < 0 ) col = 0;
  if( row < 0 ) row = 0;
  action.selector = Object.assign({}, selector, {
    col,
    row,
    index: row * 4 + col
  });
  action.type = "SELECT_PROJECT";
  store.dispatch(action);
}

