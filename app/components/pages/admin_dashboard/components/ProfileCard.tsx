import { Badge, Card, Group, Text, Title } from '@mantine/core';
import { convertFirestoreTimestampToDate } from '~/utils/helper';

function ProfileCard({ user }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Title order={3} size={'md'}>
          Profile
        </Title>
        <Badge size="sm" color={user?.isBlocked ? 'red' : 'green'}>
          {user?.isBlocked ? 'Blocked' : 'Active'}
        </Badge>
      </Group>

      <div className="space-y-1">
        <div>
          <Text size="xs" color="dimmed">
            Name
          </Text>
          <Text size="xs">
            {user?.firstName} {user?.lastName}
          </Text>
        </div>
        <div>
          <Text size="xs" color="dimmed">
            Email
          </Text>
          <Text size="xs">{user.email}</Text>
        </div>
        <div>
          <Text size="xs" color="dimmed">
            Joined
          </Text>
          <Text size="xs">
            {convertFirestoreTimestampToDate(user?.createdAt)}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
