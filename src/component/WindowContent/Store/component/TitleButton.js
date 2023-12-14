import { RightOutlined } from '@ant-design/icons';
function TitleButton({title}) {
  return (
    <span className='product_collection_card_title hoverBackground_2'>
      <div>{title}<RightOutlined style={{ fontSize: '15px' }} /></div>
    </span>
  );
}

export default TitleButton;
