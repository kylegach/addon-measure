import { draw } from "./canvas";

const colors = {
  margin: "#f6b26ba8",
  border: "#ffe599a8",
  padding: "#93c47d8c",
  content: "#6fa8dca8",
};

function pxToNumber(px) {
  return parseInt(px.replace("px", ""));
}

function measureElement(element) {
  const style = getComputedStyle(element);
  let { top, left, right, bottom, width, height } =
    element.getBoundingClientRect();

  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    borderBottomWidth,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
  } = style;

  top = top + window.scrollY;
  left = left + window.scrollX;
  bottom = bottom + window.scrollY;
  right = right + window.scrollX;

  const margin = {
    top: pxToNumber(marginTop),
    bottom: pxToNumber(marginBottom),
    left: pxToNumber(marginLeft),
    right: pxToNumber(marginRight),
  };

  const padding = {
    top: pxToNumber(paddingTop),
    bottom: pxToNumber(paddingBottom),
    left: pxToNumber(paddingLeft),
    right: pxToNumber(paddingRight),
  };

  const border = {
    top: pxToNumber(borderTopWidth),
    bottom: pxToNumber(borderBottomWidth),
    left: pxToNumber(borderLeftWidth),
    right: pxToNumber(borderRightWidth),
  };

  return {
    margin,
    padding,
    border,
    top,
    left,
    bottom,
    right,
    width,
    height,
  };
}

function drawBoxModel(element) {
  return (context) => {
    const { margin, padding, border, width, height, top, left, bottom, right } =
      measureElement(element);

    // DRAW MARGIN
    const marginHeight = height + margin.bottom + margin.top;

    context.fillStyle = colors.margin;
    // Top margin rect
    context.fillRect(left, top - margin.top, width, margin.top);
    // Bottom margin rect
    context.fillRect(left, bottom, width, margin.bottom);
    // Left margin rect
    context.fillRect(
      left - margin.left,
      top - margin.top,
      margin.left,
      marginHeight
    );
    // Right margin rect
    context.fillRect(right, top - margin.top, margin.right, marginHeight);

    // DRAW PADDING
    const paddingWidth = width - border.left - border.right;
    const paddingHeight =
      height - padding.top - padding.bottom - border.top - border.bottom;

    context.fillStyle = colors.padding;
    // Top padding rect
    context.fillRect(
      left + border.left,
      top + border.top,
      paddingWidth,
      padding.top
    );
    // Bottom padding rect
    context.fillRect(
      left + border.left,
      bottom - padding.bottom - border.bottom,
      paddingWidth,
      padding.bottom
    );
    // Left padding rect
    context.fillRect(
      left + border.left,
      top + padding.top + border.top,
      padding.left,
      paddingHeight
    );
    // Right padding rect
    context.fillRect(
      right - padding.right - border.right,
      top + padding.top + border.top,
      padding.right,
      paddingHeight
    );

    // DRAW BORDER
    const borderHeight = height - border.top - border.bottom;

    context.fillStyle = colors.border;
    // Top border rect
    context.fillRect(left, top, width, border.top);
    // Bottom border rect
    context.fillRect(left, bottom - border.bottom, width, border.bottom);
    // Left border rect
    context.fillRect(left, top + border.top, border.left, borderHeight);
    // Right border rect
    context.fillRect(
      right - border.right,
      top + border.top,
      border.right,
      borderHeight
    );

    // DRAW CONTENT
    const contentWidth =
      width - border.left - border.right - padding.left - padding.right;
    const contentHeight =
      height - padding.top - padding.bottom - border.top - border.bottom;

    context.fillStyle = colors.content;
    // content rect
    context.fillRect(
      left + border.left + padding.left,
      top + border.top + padding.top,
      contentWidth,
      contentHeight
    );
  };
}

export function drawSelectedElement(element) {
  draw(drawBoxModel(element));
}
