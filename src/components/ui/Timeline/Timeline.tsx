import TimelineMessage from '@/components/ui/Timeline/TimelineMessage';

const Timeline = ({
  messages,
}: {
  messages: {
    id: string;
    userId: string;
    username: string;
    profilePictureUrl: string;
    publishedAt: string;
    text: string;
  }[];
}) => {
  return (
    <div>
      {messages.map((msg) => (
        <TimelineMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default Timeline;
