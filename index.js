import React from 'react';

function useMouseDragging() {
  const [mouseDown, setMouseDown] = React.useState(false)
  const [moving, setMoving] = React.useState(false);

  const MOUSE_DOWN = "MOUSE_DOWN"
  const MOUSE_MOVE = "MOUSE_MOVE"
  const MOUSE_UP = "MOUSE_UP"
  const [{ mouseDown, mouseDragging }, dispatch] = React.useReducer(function (state, action) {
    switch (action.type) {
      case MOUSE_DOWN: return { mouseDown: true, mouseDragging: false };
      case MOUSE_MOVE: return { ...state, mouseDragging: state.mouseDown ? true : false };
      case MOUSE_UP: return { mouseDown: false, mouseDragging: false }
    }
  }, { mouseDown: false, mouseDragging: false })


  function handleMouseDown() {
    dispatch({ type: MOUSE_DOWN })
  }

  function handleMouseMove() {
    dispatch({ type: MOUSE_MOVE })
  }

  function handleMouseUp() {
    dispatch({ type: MOUSE_UP })
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return mouseDragging
}