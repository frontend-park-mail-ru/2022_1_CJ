import { render, createElement, createFragmentElement } from "./core";
import { useEffect } from "./@hooks/useEffect";
import { useMemo } from "./@hooks/useMemo";
import { useState } from "./@hooks/useState";
import { createStore } from "./@hooks/useStore";
import { useCallback } from "./@hooks/useCallback";
import { useForm } from "src/core/treact/@hooks/useForm";

export const treact = {
	render,
	createElement,
	useState,
	useEffect,
	useMemo,
	useCallback,
	createStore,
	useForm,
	createFragmentElement,
};
