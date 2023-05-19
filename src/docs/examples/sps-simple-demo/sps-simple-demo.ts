import {
  Value,
  scrollRise,
  stickyPlatformScene,
  timeFrame,
  moveMotion,
  sizeMotion,
  opacityMotion,
  staticActor,
} from "scroll-rise";

const sceneHeight: Value = (w, h) => (h * 2);

const blockWidth: Value = (w, h) => w/4;
const blockHeight: Value = (w, h) => h/8;

const firstHalfBlockX: Value = (w, h) => w/4 - blockWidth(w, h)/2;
const secondHalfStartBlockX: Value = (w, h) => w/4 * 3 - blockWidth(w, h)/2;
const secondHalfEndBlockX: Value = (w, h) => w/2;
const firstHalfBlockY: Value = (w, h) => h/8 - blockHeight(w, h)/2;
const secondHalfBlockY: Value = (w, h) => h/8 * 3 - blockHeight(w, h)/2;

const endBlockWidth: Value = (w, h) => w/2 - firstHalfBlockX(w, h);

const hideBlockFrame = timeFrame(opacityMotion({
  start: () => 1,
  end: () => 0,
}), (w, h) => 0, (w, h) => h/2);

const agendaStartWidth: Value = (w, h) => w/4;
const agendaStartHeight: Value = (w, h) => h/4;
const agendaEndWidth: Value = (w, h) => w/2;
const agendaEndHeight: Value = (w, h) => h/2;

scrollRise(stickyPlatformScene(
  document.getElementById('scene')!,
  sceneHeight
)).operate([
  staticActor(document.getElementById('first-block')!).use([
    timeFrame(
      moveMotion({
        startX: firstHalfBlockX,
        endX: firstHalfBlockX,
        startY: firstHalfBlockY,
        endY: firstHalfBlockY,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      sizeMotion({
        startWidth: blockWidth,
        startHeight: blockHeight,
        endWidth: endBlockWidth,
        endHeight: blockHeight,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    hideBlockFrame,
  ]),
  staticActor(document.getElementById('second-block')!).use([
    timeFrame(
      moveMotion({
        startX: secondHalfStartBlockX,
        endX: secondHalfEndBlockX,
        startY: firstHalfBlockY,
        endY: firstHalfBlockY,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      sizeMotion({
        startWidth: blockWidth,
        startHeight: blockHeight,
        endWidth: endBlockWidth,
        endHeight: blockHeight,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    hideBlockFrame,
  ]),
  staticActor(document.getElementById('third-block')!).use([
    timeFrame(
      moveMotion({
        startX: firstHalfBlockX,
        endX: firstHalfBlockX,
        startY: secondHalfBlockY,
        endY: secondHalfBlockY,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      sizeMotion({
        startWidth: blockWidth,
        startHeight: blockHeight,
        endWidth: endBlockWidth,
        endHeight: blockHeight,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    hideBlockFrame,
  ]),
  staticActor(document.getElementById('fourth-block')!).use([
    timeFrame(
      moveMotion({
        startX: secondHalfStartBlockX,
        endX: secondHalfEndBlockX,
        startY: secondHalfBlockY,
        endY: secondHalfBlockY,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      sizeMotion({
        startWidth: blockWidth,
        startHeight: blockHeight,
        endWidth: endBlockWidth,
        endHeight: blockHeight,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    hideBlockFrame,
  ]),
  staticActor(document.getElementById('agenda')!).use([
    timeFrame(
      moveMotion({
        startX: (w, h) => w/2 - agendaStartWidth(w, h)/2,
        endX: (w, h) => w/2 - agendaEndWidth(w, h)/2,
        startY: (w, h) => h/4 - agendaStartHeight(w, h)/2,
        endY: (w, h) => h/4 - agendaEndHeight(w, h)/2,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      sizeMotion({
        startWidth: agendaStartWidth,
        startHeight: agendaStartHeight,
        endWidth: agendaEndWidth,
        endHeight: agendaEndHeight,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
    timeFrame(
      opacityMotion({
        start: () => 0,
        end: () => 1,
      }),
      (w, h) => 0, (w, h) => h/2,
    ),
  ]),
]);
