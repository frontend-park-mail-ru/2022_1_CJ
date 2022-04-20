declare namespace JSX {
	interface HtmlBodyTag {
		onAfterprint?: string | Function;
		onBeforeprint?: string | Function;
		onBeforeonload?: string | Function;
		onBlur?: string | Function;
		onError?: string | Function;
		onFocus?: string | Function;
		onHaschange?: string | Function;
		onLoad?: string | Function;
		onMessage?: string | Function;
		onOffline?: string | Function;
		onOnline?: string | Function;
		onPagehide?: string | Function;
		onPageshow?: string | Function;
		onPopstate?: string | Function;
		onRedo?: string | Function;
		onResize?: string | Function;
		onStorage?: string | Function;
		onUndo?: string | Function;
		onUnload?: string | Function;
	}
	interface HtmlTag {
		onContextmenu?: string | Function;
		onKeydown?: string | Function;
		onKeypress?: string | Function;
		onKeyup?: string | Function;
		onClick?: string | Function;
		onDblclick?: string | Function;
		onDrag?: string | Function;
		onDragend?: string | Function;
		onDragenter?: string | Function;
		onDragleave?: string | Function;
		onDragover?: string | Function;
		onDragstart?: string | Function;
		onDrop?: string | Function;
		onMousedown?: string | Function;
		onMousemove?: string | Function;
		onMouseout?: string | Function;
		onMouseover?: string | Function;
		onMouseup?: string | Function;
		onMousewheel?: string | Function;
		onScroll?: string | Function;
	}
	interface FormEvents {
		onBlur?: string | Function;
		onChange?: string | Function;
		onFocus?: string | Function;
		onFormchange?: string | Function;
		onForminput?: string | Function;
		onInput?: string | Function;
		onInvalid?: string | Function;
		onSelect?: string | Function;
		onSubmit?: string | Function | Function;
	}
	interface HtmlInputTag extends FormEvents {}
	interface HtmlFieldSetTag extends FormEvents {}
	interface HtmlFormTag extends FormEvents {}
	interface MediaEvents {
		onAbort?: string | Function;
		onCanplay?: string | Function;
		onCanplaythrough?: string | Function;
		onDurationchange?: string | Function;
		onEmptied?: string | Function;
		onEnded?: string | Function;
		onError?: string | Function;
		onLoadeddata?: string | Function;
		onLoadedmetadata?: string | Function;
		onLoadstart?: string | Function;
		onPause?: string | Function;
		onPlay?: string | Function;
		onPlaying?: string | Function;
		onProgress?: string | Function;
		onRatechange?: string | Function;
		onReadystatechange?: string | Function;
		onSeeked?: string | Function;
		onSeeking?: string | Function;
		onStalled?: string | Function;
		onSuspend?: string | Function;
		onTimeupdate?: string | Function;
		onVolumechange?: string | Function;
		onWaiting?: string | Function;
	}
	interface HtmlAudioTag extends MediaEvents {}
	interface HtmlEmbedTag extends MediaEvents {}
	interface HtmlImageTag extends MediaEvents {}
	interface HtmlObjectTag extends MediaEvents {}
	interface HtmlVideoTag extends MediaEvents {}
}
