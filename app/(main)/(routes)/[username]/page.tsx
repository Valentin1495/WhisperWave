import { redirectToServer } from '@/actions/server.action';
import AddServerForm from '@/components/add-server-form';

type SetupProps = {
  params: {
    username: string;
  };
};

export default async function Setup({ params }: SetupProps) {
  await redirectToServer(params.username);

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <AddServerForm />
    </main>
  );
}
