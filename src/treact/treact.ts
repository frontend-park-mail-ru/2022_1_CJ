/*
Materials:
- https://github.com/pomber/didact
- https://reactjs.org/docs/hooks-reference.html
- https://kaihao.dev/posts/Stale-props-and-zombie-children-in-Redux
- https://medium.com/geekculture/create-your-own-react-context-b91060fd3ef0 // TODO: implement useContext 😭
*/

import { render, createElement } from "./core.js";
import { useCallback } from "./@hooks/useCallback.js";
import { useEffect } from "./@hooks/useEffect.js";
import { useMemo } from "./@hooks/useMemo.js";
import { useReducer } from "./@hooks/useReducer.js";
import { useState } from "./@hooks/useState.js";

export const treact = {
	render: render,
	createElement: createElement,
	useState: useState,
	useEffect: useEffect,
	useMemo: useMemo,
	useCallback: useCallback,
	useReducer: useReducer,
};
