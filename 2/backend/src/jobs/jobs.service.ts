import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobType } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(job);
  }

  async findAll(filters?: {
    title?: string;
    location?: string;
    type?: string;
    salaryRange?: string;
  }): Promise<Job[]> {
    const count = await this.jobRepository.count();
    if (count === 0) {
      await this.seedDefaultJobs();
    }

    const query = this.jobRepository.createQueryBuilder('job');

    if (filters?.title) {
      query.andWhere('job.title ILIKE :title', { title: `%${filters.title}%` });
    }

    if (filters?.location) {
      query.andWhere('job.location ILIKE :location', { location: `%${filters.location}%` });
    }

    if (filters?.type) {
      query.andWhere('job.type = :type', { type: filters.type });
    }

    if (filters?.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(Number);
      query.andWhere('job.salaryRange BETWEEN :min AND :max', { min, max });
    }

    return query.getMany();
  }

  private async seedDefaultJobs() {
    const defaultJobs: Partial<Job>[] = [
      {
        title: 'Software Engineer',
        company: 'Tata Consultancy Services',
        location: 'Hyderabad',
        type: JobType.FULL_TIME,
        salaryRange: '600000-800000',
        description: 'Work on enterprise software development using Java and Spring Boot.',
        requirements: 'Proficient in Java, Spring Boot, REST APIs.',
        responsibilities: 'Develop and maintain enterprise software solutions.',
        applicationDeadline: new Date('2025-12-31'),
      },
      {
        title: 'Frontend Developer',
        company: 'Infosys',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '500000-700000',
        description: 'Build responsive user interfaces using React and TypeScript.',
        requirements: 'Experience with React, TypeScript, CSS, HTML.',
        responsibilities: 'Develop UI components and ensure cross-browser compatibility.',
        applicationDeadline: new Date('2025-11-30'),
      },
      {
        title: 'Backend Developer',
        company: 'Wipro',
        location: 'Pune',
        type: JobType.FULL_TIME,
        salaryRange: '600000-900000',
        description: 'Design APIs and manage databases using Node.js and PostgreSQL.',
        requirements: 'Strong Node.js and PostgreSQL skills.',
        responsibilities: 'Develop backend services and APIs.',
        applicationDeadline: new Date('2025-10-15'),
      },
      {
        title: 'Data Analyst Intern',
        company: 'Zomato',
        location: 'Gurugram',
        type: JobType.INTERNSHIP,
        salaryRange: '15000-15000',
        description: 'Support the analytics team with dashboards and data interpretation.',
        requirements: 'Good Excel, SQL and Python skills.',
        responsibilities: 'Create dashboards and reports.',
        applicationDeadline: new Date('2025-09-30'),
      },
      {
        title: 'HR Executive',
        company: 'HCL Technologies',
        location: 'Noida',
        type: JobType.PART_TIME,
        salaryRange: '200000-300000',
        description: 'Manage recruitment pipeline and employee onboarding processes.',
        requirements: 'Strong communication and recruitment skills.',
        responsibilities: 'Coordinate hiring and onboarding.',
        applicationDeadline: new Date('2025-08-31'),
      },

      // 20 Additional jobs

      {
        title: 'Mobile App Developer',
        company: "BYJU'S",
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '700000-1000000',
        description: 'Develop Android/iOS apps using Flutter and Dart.',
        requirements: 'Experience with Flutter, Dart, and Firebase.',
        responsibilities: 'Build and maintain mobile applications.',
        applicationDeadline: new Date('2025-12-15'),
      },
      {
        title: 'Cloud Engineer',
        company: 'Tech Mahindra',
        location: 'Hyderabad',
        type: JobType.CONTRACT,
        salaryRange: '800000-1200000',
        description: 'Implement and manage AWS-based infrastructure for clients.',
        requirements: 'Knowledge of AWS, Docker, Kubernetes.',
        responsibilities: 'Deploy and monitor cloud solutions.',
        applicationDeadline: new Date('2025-11-20'),
      },
      {
        title: 'Business Analyst',
        company: 'Flipkart',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '900000-1100000',
        description: 'Gather business requirements and translate into technical specs.',
        requirements: 'Strong SQL and Agile experience.',
        responsibilities: 'Coordinate between business and tech teams.',
        applicationDeadline: new Date('2025-11-30'),
      },
      {
        title: 'Digital Marketing Intern',
        company: 'Paytm',
        location: 'Noida',
        type: JobType.INTERNSHIP,
        salaryRange: '10000-10000',
        description: 'Assist in campaign execution and SEO optimization.',
        requirements: 'Knowledge of SEO and Google Analytics.',
        responsibilities: 'Create content and track campaign results.',
        applicationDeadline: new Date('2025-09-15'),
      },
      {
        title: 'UI/UX Designer',
        company: 'Freshworks',
        location: 'Chennai',
        type: JobType.FULL_TIME,
        salaryRange: '600000-800000',
        description: 'Design intuitive user experiences using Figma and Adobe XD.',
        requirements: 'Proficient in Figma, Adobe XD, wireframing.',
        responsibilities: 'Create UI mockups and prototypes.',
        applicationDeadline: new Date('2025-12-05'),
      },
      {
        title: 'QA Engineer',
        company: 'Accenture',
        location: 'Mumbai',
        type: JobType.FULL_TIME,
        salaryRange: '500000-700000',
        description: 'Develop test plans and automated test scripts.',
        requirements: 'Experience in Selenium and manual testing.',
        responsibilities: 'Ensure software quality through testing.',
        applicationDeadline: new Date('2025-11-10'),
      },
      {
        title: 'DevOps Engineer',
        company: 'Cognizant',
        location: 'Chennai',
        type: JobType.FULL_TIME,
        salaryRange: '850000-1100000',
        description: 'Manage CI/CD pipelines and cloud infrastructure.',
        requirements: 'Proficient in Jenkins, Docker, Kubernetes.',
        responsibilities: 'Automate deployment and monitor systems.',
        applicationDeadline: new Date('2025-12-20'),
      },
      {
        title: 'Content Writer',
        company: 'MakeMyTrip',
        location: 'Gurugram',
        type: JobType.PART_TIME,
        salaryRange: '250000-350000',
        description: 'Write engaging content for travel blogs and newsletters.',
        requirements: 'Excellent writing and editing skills.',
        responsibilities: 'Create and manage content calendars.',
        applicationDeadline: new Date('2025-10-25'),
      },
      {
        title: 'Product Manager',
        company: 'Ola Cabs',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '1200000-1500000',
        description: 'Lead product development and strategy.',
        requirements: 'Experience in product lifecycle management.',
        responsibilities: 'Coordinate cross-functional teams.',
        applicationDeadline: new Date('2025-11-15'),
      },
      {
        title: 'System Administrator',
        company: 'IBM',
        location: 'Pune',
        type: JobType.CONTRACT,
        salaryRange: '700000-900000',
        description: 'Manage IT infrastructure and servers.',
        requirements: 'Linux and Windows Server expertise.',
        responsibilities: 'Maintain network security and backups.',
        applicationDeadline: new Date('2025-10-30'),
      },
      {
        title: 'Graphic Designer',
        company: 'Zomato',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '400000-600000',
        description: 'Create visuals for marketing campaigns and social media.',
        requirements: 'Adobe Photoshop and Illustrator skills.',
        responsibilities: 'Design banners, ads, and social posts.',
        applicationDeadline: new Date('2025-12-01'),
      },
      {
        title: 'Data Scientist',
        company: 'Amazon',
        location: 'Hyderabad',
        type: JobType.FULL_TIME,
        salaryRange: '1500000-1800000',
        description: 'Build models for customer behavior prediction.',
        requirements: 'Strong Python, R, and ML experience.',
        responsibilities: 'Analyze data and deliver insights.',
        applicationDeadline: new Date('2025-12-31'),
      },
      {
        title: 'Technical Support Engineer',
        company: 'Dell',
        location: 'Noida',
        type: JobType.PART_TIME,
        salaryRange: '300000-400000',
        description: 'Provide technical assistance to customers.',
        requirements: 'Good communication and problem-solving skills.',
        responsibilities: 'Resolve technical issues via phone/email.',
        applicationDeadline: new Date('2025-10-05'),
      },
      {
        title: 'Network Engineer',
        company: 'Cisco',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '900000-1100000',
        description: 'Design and maintain enterprise network systems.',
        requirements: 'Experience with routers, switches, and firewalls.',
        responsibilities: 'Monitor network performance and troubleshoot issues.',
        applicationDeadline: new Date('2025-11-25'),
      },
      {
        title: 'Machine Learning Engineer',
        company: 'Google',
        location: 'Bengaluru',
        type: JobType.FULL_TIME,
        salaryRange: '2000000-2500000',
        description: 'Develop ML models for Google products.',
        requirements: 'Strong knowledge of TensorFlow and Python.',
        responsibilities: 'Implement scalable ML pipelines.',
        applicationDeadline: new Date('2025-12-31'),
      },
      {
        title: 'Cybersecurity Analyst',
        company: 'Infosys',
        location: 'Hyderabad',
        type: JobType.FULL_TIME,
        salaryRange: '1000000-1200000',
        description: 'Monitor and protect company IT assets.',
        requirements: 'Knowledge of security protocols and tools.',
        responsibilities: 'Investigate security breaches and recommend fixes.',
        applicationDeadline: new Date('2025-11-20'),
      },
      {
        title: 'Research Assistant',
        company: 'IIT Delhi',
        location: 'Delhi',
        type: JobType.INTERNSHIP,
        salaryRange: '20000-25000',
        description: 'Assist in academic research and data analysis.',
        requirements: 'Good analytical and research skills.',
        responsibilities: 'Collect data and prepare reports.',
        applicationDeadline: new Date('2025-09-30'),
      },
      {
        title: 'Sales Executive',
        company: 'Reliance Industries',
        location: 'Mumbai',
        type: JobType.FULL_TIME,
        salaryRange: '400000-600000',
        description: 'Manage client accounts and generate new sales leads.',
        requirements: 'Good communication and negotiation skills.',
        responsibilities: 'Meet sales targets and prepare reports.',
        applicationDeadline: new Date('2025-10-31'),
      },
      {
        title: 'SEO Specialist',
        company: 'MakeMyTrip',
        location: 'Gurugram',
        type: JobType.PART_TIME,
        salaryRange: '300000-450000',
        description: 'Optimize website traffic and rankings.',
        requirements: 'Experience in SEO and SEM tools.',
        responsibilities: 'Perform keyword research and monitor analytics.',
        applicationDeadline: new Date('2025-11-15'),
      },
    ];

    for (const job of defaultJobs) {
      const existing = await this.jobRepository.findOne({ where: { title: job.title, company: job.company } });
      if (!existing) {
        await this.jobRepository.save(this.jobRepository.create(job));
      }
    }
  }
}
