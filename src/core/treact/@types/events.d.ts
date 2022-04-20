declare namespace JSX {
	interface HtmlBodyTag {
		onAfterPrint?: string | Function;
		onBeforePrint?: string | Function;
		onBeforeUnload?: string | Function;
		onBlur?: string | Function;
		onError?: string | Function;
		onFocus?: string | Function;
		onHaschange?: string | Function;
		onLoad?: string | Function;
		onMessage?: string | Function;
		onOffline?: string | Function;
		onOnline?: string | Function;
		onPageHide?: string | Function;
		onPageShow?: string | Function;
		onPopState?: string | Function;
		onRedo?: string | Function;
		onResize?: string | Function;
		onStorage?: string | Function;
		onUndo?: string | Function;
		onUnload?: string | Function;
	}
	interface HtmlTag {
		onContextmenu?: string | Function;
		onKeyDown?: string | Function;
		onKeyPress?: string | Function;
		onKeyUp?: string | Function;
		onClick?: string | Function;
		onDblClick?: string | Function;
		onDrag?: string | Function;
		onDragEnd?: string | Function;
		onDragEnter?: string | Function;
		onDragLeave?: string | Function;
		onDragOver?: string | Function;
		onDragStart?: string | Function;
		onDrop?: string | Function;
		onMouseDown?: string | Function;
		onMouseMove?: string | Function;
		onMouseOut?: string | Function;
		onMouseOver?: string | Function;
		onMouseUp?: string | Function;
		onMouseWheel?: string | Function;
		onScroll?: string | Function;
	}
	interface FormEvents {
		onBlur?: string | Function;
		onChange?: string | Function;
		onFocus?: string | Function;
		onFormChange?: string | Function;
		onFormInput?: string | Function;
		onInput?: string | Function;
		onInvalid?: string | Function;
		onSelect?: string | Function;
		onSubmit?: string | Function;
	}
	interface HtmlInputTag extends FormEvents {}
	interface HtmlSelectTag extends FormEvents {}
	interface HtmlFieldSetTag extends FormEvents {}
	interface HtmlFormTag extends FormEvents {}
	interface MediaEvents {
		onAbort?: string | Function;
		onCanplay?: string | Function;
		onCanPlaythrough?: string | Function;
		onDurationChange?: string | Function;
		onEmptied?: string | Function;
		onEnded?: string | Function;
		onError?: string | Function;
		onLoadedData?: string | Function;
		onLoadedMetadata?: string | Function;
		onLoadstart?: string | Function;
		onPause?: string | Function;
		onPlay?: string | Function;
		onPlaying?: string | Function;
		onProgress?: string | Function;
		onRateChange?: string | Function;
		onReadyStateChange?: string | Function;
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
