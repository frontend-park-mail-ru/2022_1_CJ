declare namespace JSX {
	interface HtmlBodyTag {
		onafterprint?: string | Function;
		onbeforeprint?: string | Function;
		onbeforeonload?: string | Function;
		onblur?: string | Function;
		onerror?: string | Function;
		onfocus?: string | Function;
		onhaschange?: string | Function;
		onload?: string | Function;
		onmessage?: string | Function;
		onoffline?: string | Function;
		ononline?: string | Function;
		onpagehide?: string | Function;
		onpageshow?: string | Function;
		onpopstate?: string | Function;
		onredo?: string | Function;
		onresize?: string | Function;
		onstorage?: string | Function;
		onundo?: string | Function;
		onunload?: string | Function;
	}
	interface HtmlTag {
		oncontextmenu?: string | Function;
		onkeydown?: string | Function;
		onkeypress?: string | Function;
		onkeyup?: string | Function;
		onclick?: string | Function;
		ondblclick?: string | Function;
		ondrag?: string | Function;
		ondragend?: string | Function;
		ondragenter?: string | Function;
		ondragleave?: string | Function;
		ondragover?: string | Function;
		ondragstart?: string | Function;
		ondrop?: string | Function;
		onmousedown?: string | Function;
		onmousemove?: string | Function;
		onmouseout?: string | Function;
		onmouseover?: string | Function;
		onmouseup?: string | Function;
		onmousewheel?: string | Function;
		onscroll?: string | Function;
	}
	interface FormEvents {
		onblur?: string | Function;
		onchange?: string | Function;
		onfocus?: string | Function;
		onformchange?: string | Function;
		onforminput?: string | Function;
		oninput?: string | Function;
		oninvalid?: string | Function;
		onselect?: string | Function;
		onsubmit?: string | Function | Function;
	}
	interface HtmlInputTag extends FormEvents {}
	interface HtmlFieldSetTag extends FormEvents {}
	interface HtmlFormTag extends FormEvents {}
	interface MediaEvents {
		onabort?: string | Function;
		oncanplay?: string | Function;
		oncanplaythrough?: string | Function;
		ondurationchange?: string | Function;
		onemptied?: string | Function;
		onended?: string | Function;
		onerror?: string | Function;
		onloadeddata?: string | Function;
		onloadedmetadata?: string | Function;
		onloadstart?: string | Function;
		onpause?: string | Function;
		onplay?: string | Function;
		onplaying?: string | Function;
		onprogress?: string | Function;
		onratechange?: string | Function;
		onreadystatechange?: string | Function;
		onseeked?: string | Function;
		onseeking?: string | Function;
		onstalled?: string | Function;
		onsuspend?: string | Function;
		ontimeupdate?: string | Function;
		onvolumechange?: string | Function;
		onwaiting?: string | Function;
	}
	interface HtmlAudioTag extends MediaEvents {}
	interface HtmlEmbedTag extends MediaEvents {}
	interface HtmlImageTag extends MediaEvents {}
	interface HtmlObjectTag extends MediaEvents {}
	interface HtmlVideoTag extends MediaEvents {}
}
