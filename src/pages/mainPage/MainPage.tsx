import { FC, Suspense, useState } from 'react';
import {
  UploadOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloudDownloadOutlined,
  InboxOutlined,
  CloseOutlined,
  BuildOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Select } from 'antd';
import styles from './MainPage.module.scss';
import { Preloader } from '../../entities/preloader';
import { ChartEntity } from '../../entities/chartEntity';
const { Sider } = Layout;

const statistics = [
  'Number of growth points',
  'Number of intersections',
  'Co-growth frequency',
  'Co-growth area size',
  'Lifetime',
];

const items = [
  {
    key: '1',
    icon: <InboxOutlined />,
    label: 'Сохраненные данные',
    children: [
      { key: 'Глюкоза', label: 'Глюкоза' },
      { key: 'Инсулин', label: 'Инсулин' },
      { key: 'Сахар', label: 'Сахар' },
      { key: 'Давление', label: 'Давление' },
      { key: 'Жиры', label: 'Жиры' },
      { key: 'Белки', label: 'Белки' },
      { key: 'Углеводы', label: 'Углеводы' },
      { key: 'Витамин A', label: 'Витамин A' },
      { key: 'Витамин B', label: 'Витамин B' },
      { key: 'Витамин C', label: 'Витамин C' },
      { key: 'Витамин D', label: 'Витамин D' },
      { key: 'Витамин E', label: 'Витамин E' },
    ],
  },
  {
    key: '2',
    icon: <CloudDownloadOutlined />,
    label: 'Загруженные файлы',
    children: [
      { key: 'Железо', label: 'Железо' },
      { key: 'Магний', label: 'Магний' },
      { key: 'Цинк', label: 'Цинк' },
      { key: 'Мелатонин', label: 'Мелатонин' },
    ],
  },
  {
    key: '3',
    icon: <ClockCircleOutlined />,
    label: 'Недавние файлы',
    children: [
      { key: 'Витамин E', label: 'Витамин E' },
      { key: 'Мелатонин', label: 'Мелатонин' },
    ],
  },
];

const getOptions = () =>
  [...items[0]?.children, ...items[1]?.children].map((option) => {
    return {
      value: option.key,
      label: option.label,
    };
  });

const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const MainPage: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showItems, setShowItems] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);

  return (
    <Layout
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <Sider
        style={{ backgroundColor: '#faf6ed' }}
        className={styles.sider}
        collapsedWidth='300'
        collapsed={collapsed}
        width='500'
      >
        {
          <div
            style={{
              borderRadius: '16px 16px 0 0',
              backgroundColor: '#faf6ed',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 20px',
            }}
          >
            {selectedItems.length === 2 ? (
              <Button
                style={{ lineHeight: 1 }}
                icon={<BuildOutlined />}
                onClick={() => {
                  setShowItems(selectedItems);
                  setSelectedItems([]);
                  setIsBuilding(true);
                }}
              >
                Построить
              </Button>
            ) : isSearching ? (
              <div style={{ display: 'flex', gap: 5 }}>
                <Select
                  showSearch
                  style={{
                    width: 250,
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    borderRadius: 8,
                  }}
                  placeholder='Поиск'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={getOptions()}
                  onSelect={(value) => {
                    if (selectedItems.length < 2 && !selectedItems.includes(value)) {
                      setSelectedItems([...selectedItems, value]);
                    }
                  }}
                />
                <Button
                  icon={<CloseOutlined />}
                  className={styles['button']}
                  onClick={() => {
                    setIsSearching(false);
                  }}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 5 }}>
                {collapsed ? (
                  <Button
                    icon={<SearchOutlined />}
                    onClick={() => {
                      setCollapsed(false);
                      setIsSearching(true);
                    }}
                  />
                ) : (
                  <Button
                    icon={<SearchOutlined />}
                    onClick={() => {
                      setIsSearching(true);
                    }}
                    iconPosition='end'
                    style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
                  >
                    Поиск
                  </Button>
                )}
                {collapsed ? (
                  <Button
                    icon={<UploadOutlined />}
                    style={{ display: 'flex', alignItems: 'center' }}
                  />
                ) : (
                  <Button
                    icon={<UploadOutlined />}
                    iconPosition='end'
                    style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}
                    onClick={() => alert('Еще находится в разработке')}
                  >
                    Загрузка
                  </Button>
                )}
              </div>
            )}

            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
                setIsSearching(false);
              }}
              style={{
                backgroundColor: '#faf6ed',
                color: '#02353c',
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
        }
        <Menu
          className={styles.menu}
          style={{ borderInlineEnd: 0 }}
          mode='inline'
          multiple
          items={items}
          selectedKeys={selectedItems}
          onSelect={({ selectedKeys }) => {
            if (selectedKeys.length <= 2) {
              setSelectedItems(selectedKeys);
            }
          }}
          onDeselect={({ selectedKeys }) => {
            setSelectedItems(selectedKeys);
          }}
        />
      </Sider>
      <Layout
        className={styles['layout']}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: 'white',
          marginRight: 20,
        }}
      >
        <section
          style={{
            padding: '20px 30px',
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            backgroundColor: '#faf6ed',
            borderRadius: 16,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}
        >
          {isBuilding ? (
            statistics.map((statistic) => (
              <div style={{ display: 'flex', gap: 10, minWidth: 200 }}>
                <hr
                  style={{
                    width: 5,
                    backgroundColor: '#449342',
                    outline: 'none',
                    border: 'none',
                    borderRadius: 8,
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ color: '#144d14', fontSize: 18, fontWeight: 500 }}>
                    {statistic}
                  </span>
                  <span style={{ color: 'rgb(20, 77, 20, 0.6)' }}>{numberWithCommas(112893)}</span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                minHeight: 51,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#144d14',
                fontSize: '26px',
                fontWeight: 500,
              }}
            >
              {'Для отображения статистик выберите данные для метрик и нажмите построить'}
            </div>
          )}
        </section>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 30,
            flex: 1,
            backgroundColor: '#faf6ed',
            borderRadius: 16,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}
        >
          {isBuilding ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span
                  style={{
                    color: '#144d14',
                    fontSize: '26px',
                    fontWeight: 500,
                    letterSpacing: '1.05px',
                  }}
                >
                  {'Построенные метрики для указанной пары данных:'}
                </span>
                <span
                  style={{
                    color: 'rgb(20, 77, 20, 0.6)',
                    fontSize: '26px',
                    fontWeight: 500,
                    letterSpacing: '1.05px',
                  }}
                >
                  {showItems[0]} и {showItems[1]}
                </span>
              </div>
              <main
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                }}
              >
                <Suspense fallback={<Preloader />}>
                  <ChartEntity />
                </Suspense>
              </main>
            </>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#144d14',
                fontSize: '26px',
                fontWeight: 500,
              }}
            >
              {'Выберите данные для их визуализации и нажмите построить'}
            </div>
          )}
        </section>
      </Layout>
    </Layout>
  );
};

export default MainPage;
