import { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
  Brush,
  AreaChart,
  Area,
} from 'recharts';
import { Button } from '../../utils/ui/Button';
import { Modal } from 'antd';
import { MOCK_DATA } from './mockData';

const getInitialData = (items: string[]) => {
  const mergedData = [];

  for (let i = 0; i < Math.max(MOCK_DATA[items[0]].length, MOCK_DATA[items[1]].length); i++) {
    mergedData.push({
      time: MOCK_DATA[items[0]][i].time || null,
      [`${items[0]}`]: MOCK_DATA[items[0]][i].value || null,
      [`${items[1]}`]: MOCK_DATA[items[1]][i].value || null,
    });
    console.log(mergedData);
  }

  return mergedData;
};

const getMLS = (data: any) => {
  const [time, first, second] = Object.keys(data[0]);
  return data.map((point: any) => {
    return {
      time: point[time],
      diff: Math.pow(point[first] - point[second], 2),
    };
  });
};

export class ChartEntity extends Component<{ items: string[] }, any> {
  getAxisYDomain = (from: number, to: number, ref: string, offset: number, items: string[]) => {
    const refData: any[] = getInitialData(items).slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  getInitialState = (items: string[]) => {
    return {
      data: getInitialData(items),
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax',
      bottom: 'dataMin',
      top2: 'dataMax',
      bottom2: 'dataMin',
      animation: true,
      isModalOpen: false,
      items: items,
    };
  };

  constructor(props: any) {
    super(props);
    this.state = this.getInitialState(this.props.items);
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const { items } = this.state;
    // yAxis domain
    const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'value1', 1, items);
    const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'value2', 50, items);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax',
      bottom: 'dataMin',
      top2: 'dataMax',
      bottom2: 'dataMin',
    }));
  }

  showModal() {
    this.setState(() => ({ ...this.state, isModalOpen: true }));
  }

  handleOk() {
    this.setState(() => ({ ...this.state, isModalOpen: false }));
  }

  handleCancel() {
    this.setState(() => ({ ...this.state, isModalOpen: false }));
  }

  render() {
    const { data, left, right, refAreaLeft, refAreaRight, top, top2, isModalOpen } = this.state;

    return (
      <div
        className='highlight-bar-charts'
        style={{
          userSelect: 'none',
          width: '100%',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 25,
          padding: '0 40px',
        }}
      >
        <div>
          <Button style={{ marginRight: 20 }} onClick={this.showModal.bind(this)}>
            Подробнее
          </Button>
          <Button style={{ marginRight: 20 }} onClick={this.zoomOut.bind(this)}>
            Уменьшить
          </Button>
        </div>
        <ResponsiveContainer>
          <LineChart
            style={{ position: 'relative' }}
            data={data}
            onMouseDown={(e: any) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e: any) =>
              this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })
            }
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis allowDataOverflow dataKey='time' domain={[left, right]} type='number' />
            <YAxis allowDataOverflow domain={[0, top]} type='number' yAxisId='1' />
            <YAxis
              orientation='right'
              allowDataOverflow
              domain={[0, top2]}
              type='number'
              yAxisId='2'
            />
            <Tooltip />
            <Line
              connectNulls
              yAxisId='1'
              type='natural'
              dataKey={this.state.items[0]}
              stroke='#8884d8'
              animationDuration={300}
            />
            <Line
              connectNulls
              yAxisId='2'
              type='natural'
              dataKey={this.state.items[1]}
              stroke='#82ca9d'
              animationDuration={300}
            />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId='1' x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
        <Modal
          width={1000}
          title='Подробная модель'
          open={isModalOpen}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div style={{ width: '100%' }}>
            <h4>Первый признак ({this.state.items[0]})</h4>
            <ResponsiveContainer width='100%' height={200}>
              <LineChart
                width={500}
                height={200}
                data={data}
                syncId='anyId'
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='time' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey={this.state.items[0]}
                  stroke='#8884d8'
                  fill='#8884d8'
                />
              </LineChart>
            </ResponsiveContainer>
            <h4>Второй признак ({this.state.items[1]})</h4>
            <ResponsiveContainer width='100%' height={200}>
              <LineChart
                width={500}
                height={200}
                data={data}
                syncId='anyId'
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='time' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey={this.state.items[1]}
                  stroke='#82ca9d'
                  fill='#82ca9d'
                />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
            <h4>МНК признаков</h4>
            <ResponsiveContainer width='100%' height={200}>
              <AreaChart
                width={500}
                height={200}
                data={getMLS(data)}
                syncId='anyId'
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='time' />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey='diff' stroke='#82ca9d' fill='#82ca9d' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Modal>
      </div>
    );
  }
}
