import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  // The code below won't execute because redirect() throws an error
  return null;
}
