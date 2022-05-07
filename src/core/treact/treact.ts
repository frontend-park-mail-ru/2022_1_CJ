import { render, createElement, createFragmentElement } from "src/core/treact/core";
import { useEffect } from "src/core/treact/@hooks/useEffect";
import { useMemo } from "src/core/treact/@hooks/useMemo";
import { useState } from "src/core/treact/@hooks/useState";
import { createStore } from "src/core/treact/@hooks/useStore";
import { useCallback } from "src/core/treact/@hooks/useCallback";
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
