import { render, createElement, createFragmentElement } from "./core";
import { useEffect } from "./@hooks/useEffect";
import { useMemo } from "./@hooks/useMemo";
import { useReducer } from "./@hooks/useReducer";
import { useState } from "./@hooks/useState";
import { createStore } from "./@hooks/useStore";
import { useCallback } from "./@hooks/useCallback";

export const treact = {
	render,
	createElement,
	useState,
	useEffect,
	useMemo,
	useCallback,
	useReducer,
	createStore,
	createFragmentElement,
};
