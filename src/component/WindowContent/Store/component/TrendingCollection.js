import '../style/productCollectionCard.css';

import TitleButton from './TitleButton';
function TrendingCollection({title, data}) {
  return (
    <div className='card_content trending_collection_content'>
      <TitleButton title={title} />
      <div className=''>
      </div>
    </div>
  );
}

export default TrendingCollection;

