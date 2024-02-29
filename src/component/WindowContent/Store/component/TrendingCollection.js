import '../style/trendingCollectionContent.css';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import TitleButton from './TitleButton';
function TrendingCollection({title, data}) {
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  return (
    <div className='card_content trending_collection_content'>
      <TitleButton title={title} />
      <div className='trending_collection_body'>
        <Row  style={{height: '100%'}} gutter={24}>
          {data.map((ele, i) => {
            return (
              <Col key={i} className="trending_collection_content_row" span={12}>
                <div className='trending_collection_body_card hoverBackground_2'>
                  <img src={ele.img} />
                  <div>
                    <div className='trending_collection_body_title'>{ele.title}</div>
                    <div className='trending_collection_body_time'>{ele.rating}</div>
                    <div style={{ background: backgroundColor_1 }} className='normal_card_price'>{ele.price}</div>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
}

export default TrendingCollection;

