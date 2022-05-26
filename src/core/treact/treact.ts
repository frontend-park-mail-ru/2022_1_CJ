import { useCallback } from "src/core/treact/@hooks/useCallback";
import { useEffect } from "src/core/treact/@hooks/useEffect";
import { useForm } from "src/core/treact/@hooks/useForm";
import { useMemo } from "src/core/treact/@hooks/useMemo";
import { useState } from "src/core/treact/@hooks/useState";
import { createStore } from "src/core/treact/@hooks/useStore";
import { useUpdate } from "src/core/treact/@hooks/useUpdate";
import { createElement, createFragmentElement, render } from "src/core/treact/core/jsx";

export const treact = {
	render,
	createElement,
	createFragmentElement,
	useState,
	useEffect,
	useMemo,
	useCallback,
	createStore,
	useForm,
	useUpdate,
};

export type { Component, ModalComponent } from "src/core/treact/core/models";
