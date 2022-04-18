import { render, createElement } from "./core";
import { useCallback } from "src/core/treact/@hooks/useCallback";
import { useEffect } from "src/core/treact/@hooks/useEffect";
import { useMemo } from "src/core/treact/@hooks/useMemo";
import { useReducer } from "src/core/treact/@hooks/useReducer";
import { useState } from "src/core/treact/@hooks/useState";
import { createStore } from "src/core/treact/@hooks/useStore";

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
