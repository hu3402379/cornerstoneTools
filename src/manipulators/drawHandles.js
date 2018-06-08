import external from '../externalModules.js';
import toolStyle from '../stateManagement/toolStyle.js';

const handleRadius = 6;

export default function (context, renderData, handles, color, options) {
  context.strokeStyle = color;

  Object.keys(handles).forEach(function (name) {
    const handle = handles[name];

    if (handle.drawnIndependently === true) {
      return;
    }

    if (options && options.drawHandlesIfActive === true && !handle.active) {
      return;
    }

    context.beginPath();

    if (handle.active) {
      context.lineWidth = toolStyle.getActiveWidth();
    } else {
      context.lineWidth = toolStyle.getToolWidth();
    }

    const handleCanvasCoords = external.cornerstone.pixelToCanvas(renderData.element, handle);

    // Context.arc(handleCanvasCoords.x, handleCanvasCoords.y, handleRadius, 0, 2 * Math.PI);
    context.rect(handleCanvasCoords.x - 1, handleCanvasCoords.y - 1, 2, 2);

    if (options && options.fill) {
      context.fillStyle = options.fill;
      context.fill();
    }

    context.stroke();
  });
}
