import { useState } from 'react';
import { Card, Text, Button, Badge, Modal, Avatar } from '@mantine/core';
import { IconClock, IconCurrencyRupee, IconBuilding } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Job } from '../types/job';

dayjs.extend(relativeTime);

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {/* Modal for application submission */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Application Submitted"
        centered
        withCloseButton
        overlayProps={{ opacity: 0.55, blur: 3 }}
      >
        Your application has been submitted successfully!
      </Modal>

      <Card
        className="bg-white rounded-xl shadow-md p-4 flex flex-col"
        style={{ width: 300, height: 320, position: 'relative' }}
      >
        {/* Top Row */}
        <div className="flex justify-between items-center mb-3" style={{ flexShrink: 0 }}>
          <Avatar
            radius="xl"
            size={40}
            className="bg-gray-300 text-black font-bold text-4xl flex items-center justify-center"
            style={{ lineHeight: 1 }}
          >
            {job.company.charAt(0).toUpperCase()}
          </Avatar>

          <Badge
            className="text-white text-[10px] bg-blue-100 bg-sky-300 hover:bg-sky-600 px-1 py-1 rounded-md"
            color="blue"
            variant="filled"
          >
            {dayjs(job.createdAt).fromNow()}
          </Badge>
        </div>

        {/* Job Title */}
        <Text size="lg" fw={600} className="mb-2 text-black" style={{ flexShrink: 0 }}>
          {job.title}
        </Text>

        {/* Job Info */}
        <div className="space-y-1 mb-3" style={{ flexShrink: 0 }}>
          <div className="flex items-center space-x-2 text-black">
            <IconClock size={16} />
            <Text size="sm" className="text-black">
              1-3 yr Exp
            </Text>
          </div>
          <div className="flex items-center space-x-2 text-black">
            <IconBuilding size={16} />
            <Text size="sm" className="text-black">
              {job.type}
            </Text>
          </div>
          <div className="flex items-center space-x-2 text-black">
            <IconCurrencyRupee size={16} />
            <Text size="sm" className="text-black">
              {job.salaryRange} LPA
            </Text>
          </div>
        </div>

        {/* Description */}
        <ul
          className="list-disc pl-5 mb-4 text-black text-sm overflow-y-auto"
          style={{ flexGrow: 1, marginBottom: '1rem' }}
        >
          {job.description.split('\n').map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        {/* Apply Button */}
        <div style={{ flexShrink: 0 }}>
          <Button
            className="text-white w-full bg-sky-500 hover:bg-sky-600 px-6 py-2 rounded-md"
            fullWidth
            onClick={() => alert('Your application has been submitted successfully!')}
// open modal on click
          >
            Apply Now
          </Button>
        </div>
      </Card>
    </>
  );
}
