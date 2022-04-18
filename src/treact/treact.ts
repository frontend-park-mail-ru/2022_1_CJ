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
