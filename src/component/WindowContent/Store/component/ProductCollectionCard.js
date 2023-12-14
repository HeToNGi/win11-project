import '../style/productCollectionCard.css';

import TitleButton from './TitleButton';
function ProductCollectionCard({content, title}) {
  return (
    <div className='product_collection_card'>
      <TitleButton title={title} />
      {content}
    </div>
  );
}

export default ProductCollectionCard;
