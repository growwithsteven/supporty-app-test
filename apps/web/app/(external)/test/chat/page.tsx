import Script from "next/script";

const TEST_PROJECT_UUID = "72ca4cff-7731-4fdb-8ed8-08929d4da94e";

export default function ChatTestPage() {
  return (
    <div>
      <Script
        src={`/api/embed.js?p=${TEST_PROJECT_UUID}&anim=true&test=true`}
      />
      Chat Test
    </div>
  );
}
