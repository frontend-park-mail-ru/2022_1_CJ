/*
Materials:
- https://github.com/pomber/didact
- https://github.com/nicojs/typed-html
- https://reactjs.org/docs/hooks-reference.html
- https://kaihao.dev/posts/Stale-props-and-zombie-children-in-Redux
- https://medium.com/geekculture/create-your-own-react-context-b91060fd3ef0 // TODO,
*/

import { render, createElement } from "./core";
import { useCallback } from "./@hooks/useCallback";
import { useEffect } from "./@hooks/useEffect";
import { useMemo } from "./@hooks/useMemo";
import { useReducer } from "./@hooks/useReducer";
import { useState } from "./@hooks/useState";
import { createStore } from "./@hooks/useStore";

export const treact = {
	render,
	createElement,
	useState,
	useEffect,
	useMemo,
	useCallback,
	useReducer,
	createStore,
};
