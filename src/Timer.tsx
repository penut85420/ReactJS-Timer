import React from "react";

type TimerState = {
  time: Date;
};

function toLocal(n: number) {
  return n.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function formatTimeString(time: Date) {
  const e1 = [time.getHours(), time.getMinutes(), time.getSeconds()];
  const e2 = e1.map((val) => toLocal(val));

  return `${e2[0]}:${e2[1]}:${e2[2]}`;
}

function thisYearPast(time: Date) {
  const yy = time.getFullYear();
  const d0: Date = new Date(yy, 0, 1);
  let delta = Math.abs(time.getTime() - d0.getTime());
  delta = Math.ceil(delta / (1000 * 60 * 60 * 24));

  return `${yy} 年已經過去 ${delta} 天了`;
}

export class Timer extends React.Component<{}, TimerState> {
  timer: number = 0;

  constructor(props: {}) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ time: new Date() });
  }

  render(): React.ReactNode {
    return (
      <div id="timer_root">
        <div id="now_time">
          現在時間 {formatTimeString(this.state.time)} (UTC+8)
        </div>
        <div id="past_days">{thisYearPast(this.state.time)}</div>
      </div>
    );
  }
}
