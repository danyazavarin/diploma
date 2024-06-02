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

const initialData = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222 },
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 },
];

const getAxisYDomain = (from: number, to: number, ref: string, offset: number) => {
  const refData: any[] = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: initialData,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
  isModalOpen: false,
};

export class ChartEntity extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
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

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

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
      top: 'dataMax+1',
      bottom: 'dataMin-1',
      top2: 'dataMax+20',
      bottom2: 'dataMin-20',
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
    const {
      data,
      left,
      right,
      refAreaLeft,
      refAreaRight,
      top,
      bottom,
      top2,
      bottom2,
      isModalOpen,
    } = this.state;

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
            data={data}
            onMouseDown={(e: any) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e: any) =>
              this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })
            }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis allowDataOverflow dataKey='name' domain={[left, right]} type='number' />
            <YAxis allowDataOverflow domain={[bottom, top]} type='number' yAxisId='1' />
            <YAxis
              orientation='right'
              allowDataOverflow
              domain={[bottom2, top2]}
              type='number'
              yAxisId='2'
            />
            <Tooltip />
            <Line
              connectNulls
              yAxisId='1'
              type='natural'
              dataKey='cost'
              stroke='#8884d8'
              animationDuration={300}
            />
            <Line
              connectNulls
              yAxisId='2'
              type='natural'
              dataKey='impression'
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
          title='Basic Modal'
          open={isModalOpen}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <div style={{ width: '100%' }}>
            <h4>A demo of synchronized AreaCharts</h4>

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
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='cost' stroke='#8884d8' fill='#8884d8' />
              </LineChart>
            </ResponsiveContainer>
            <p>Maybe some other content</p>

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
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='impression' stroke='#82ca9d' fill='#82ca9d' />
                <Brush />
              </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width='100%' height={200}>
              <AreaChart
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
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Modal>
      </div>
    );
  }
}
