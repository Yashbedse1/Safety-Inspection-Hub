import { use } from 'react';
import { ChecklistDetailClient } from '../../../components/detail/ChecklistDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ChecklistDetailPage({ params }: PageProps) {
  const { slug } = use(params);

  // Parse the slug to extract ID
  const parts = slug.split('-');

  // finding ID in the format chk-XXX
  let id = '';

  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i] === 'chk' && /^\d+$/.test(parts[i + 1])) {
      id = `${parts[i]}-${parts[i + 1]}`;
      break;
    }
  }
  // alternatively trying to find any part that starts with 'chk'
  if (!id) {
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].startsWith('chk')) {
        id = parts[i];
        break;
      }
    }
  }

  // taking the last part as ID if it looks like an ID
  if (!id && parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('chk') || /^\d+$/.test(lastPart)) {
      id = lastPart;
    }
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid URL</h1>
          <p className="text-gray-600">The checklist URL is not valid.</p>
          <p className="text-sm text-gray-500 mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  return <ChecklistDetailClient id={id} />;
}
