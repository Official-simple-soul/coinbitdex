import {
  Card,
  Text,
  Title,
  Badge,
  Group,
  SimpleGrid,
  Modal,
  Image,
  Button,
  Tabs,
} from '@mantine/core';
import {
  IconId,
  IconCalendar,
  IconFlag,
  IconFileText,
  IconFiles,
  IconUserCheck,
  IconClock,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { convertFirestoreTimestampToDate } from '~/utils/helper';

const KycVerificationCard = ({ kycArray = [] }) => {
  const [opened, setOpened] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeTab, setActiveTab] = useState(kycArray[0]?.id || null);

  const openDocumentModal = (document: any) => {
    setSelectedDocument(document);
    setOpened(true);
  };

  const renderDocumentPreview = (document: any) => {
    if (!document) return <Text>No document available</Text>;

    const isPdf = document.startsWith('data:application/pdf');
    const isImage = document.startsWith('data:image');

    if (isImage) {
      return <Image src={document} alt="KYC document" fit="contain" />;
    }
    if (isPdf) {
      return (
        <iframe
          src={document}
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="KYC Document"
        />
      );
    }
    return <Text>Unsupported document format</Text>;
  };

  return (
    <>
      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="sm">
          <Title order={3} size="md">
            Identity Verification
          </Title>
        </Group>

        {kycArray?.length === 0 ? (
          <Text mt="sm" color="dimmed">
            No KYC submissions found
          </Text>
        ) : (
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              {kycArray?.map((kyc) => (
                <Tabs.Tab
                  key={kyc.id}
                  value={kyc.id}
                  leftSection={<IconFiles size={16} />}
                  className="capitalize"
                >
                  {kyc.card_type?.replace('_', ' ')}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {kycArray?.map((kyc) => (
              <Tabs.Panel key={kyc.id} value={kyc.id} pt="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                  <Group>
                    <IconId size={20} color="var(--mantine-color-blue-6)" />
                    <div>
                      <Text size="xs" color="dimmed">
                        Document Type
                      </Text>
                      <Text fw={500} size="xs" tt="capitalize">
                        {kyc.card_type?.replace('_', ' ')}
                      </Text>
                    </div>
                  </Group>

                  <Group>
                    <IconCalendar
                      size={20}
                      color="var(--mantine-color-blue-6)"
                    />
                    <div>
                      <Text size="xs" color="dimmed">
                        Submitted On
                      </Text>
                      <Text size="xs" fw={500}>
                        {convertFirestoreTimestampToDate(kyc.createdAt)}
                      </Text>
                    </div>
                  </Group>

                  <Group>
                    <IconFlag size={20} color="var(--mantine-color-blue-6)" />
                    <div>
                      <Text size="xs" color="dimmed">
                        Country
                      </Text>
                      <Text size="xs" className="uppercase" fw={500}>
                        {kyc.country}
                      </Text>
                    </div>
                  </Group>

                  {kyc.document && (
                    <Group>
                      <IconFileText
                        size={20}
                        color="var(--mantine-color-blue-6)"
                      />
                      <div>
                        <Text size="xs" color="dimmed">
                          Document
                        </Text>
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => openDocumentModal(kyc.document)}
                        >
                          View Document
                        </Button>
                      </div>
                    </Group>
                  )}
                </SimpleGrid>
              </Tabs.Panel>
            ))}
          </Tabs>
        )}
      </Card>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="KYC Document"
        size="xl"
        centered
      >
        {renderDocumentPreview(selectedDocument)}
      </Modal>
    </>
  );
};

export default KycVerificationCard;
