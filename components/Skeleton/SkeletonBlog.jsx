import Skeleton from 'components/Skeleton/SkeletonElement';
import Spark from 'components/Skeleton/Spark';

const SkeletonBlog = ({ dir }) => {
  return (
    <div
      className='skeleton-blog'
      style={dir == 'h' ? { display: 'block' } : null}
    >
      <div className='skeleton-blog__img'>
        <Skeleton type='thumbnail' />
      </div>
      <div className='skeleton-blog__content'>
        <Skeleton type='title' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
      </div>

      <Spark />
    </div>
  );
};

export default SkeletonBlog;
