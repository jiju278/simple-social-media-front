import Timeline from '@/components/ui/Timeline/Timeline';
import { exhaustiveGuard } from '@/lib/common/utils/exhaustive-guards';
import { RootState } from '@/lib/create-store';
import {
  HomeViewModelType,
  selectHomeViewModel,
} from '@/pages/Home/Home.viewmodel';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectHomeViewModel>
  >((rootState) =>
    selectHomeViewModel(rootState, () => new Date().toISOString())
  );

  const timelineNode: ReactNode = (() => {
    switch (viewModel.timeline.type) {
      case HomeViewModelType.LoadingTimeline:
        return <p>{viewModel.timeline.info}</p>;
      case HomeViewModelType.NoTimeline:
        return null;
      case HomeViewModelType.EmptyTimeline:
        return <p>{viewModel.timeline.info}</p>;
      case HomeViewModelType.WithMessages:
        return <Timeline messages={viewModel.timeline.messages} />;
      default:
        exhaustiveGuard(viewModel.timeline);
    }
  })();

  return timelineNode;
}

export default Home;
