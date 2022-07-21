// import './skeletonElements'
import Shimmer from './shimmer'
import SkeletonElements from './skeletonElements'

export default function SkeletonHome() {
  return (
    <div className='home'>
      <div className='skeletonUsn'>
        <SkeletonElements type='h2Text' />
        <div className='skFlex'>
          <SkeletonElements type='title' />
          <SkeletonElements type='title' />
          <SkeletonElements type='title' />
        </div>
        <Shimmer />
      </div>
      <div className='skeletonMainWrapper'>
        <SkeletonElements type='titleShort' />
        <div className='skeletonSubjectWrapper'>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className='skeletonSubject'>
              <SkeletonElements type='avatar' />
              <div className='right'>
                <SkeletonElements type='h2TextShort' />
                <SkeletonElements type='textShort' />
                <SkeletonElements type='text' />
              </div>
              <Shimmer />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
