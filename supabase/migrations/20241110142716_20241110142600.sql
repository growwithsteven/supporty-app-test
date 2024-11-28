drop policy "chats_select" on "public"."chats";

drop index if exists "public"."chats_project_uuid_user_uuid_disabled_at_idx";

alter table "public"."chats" drop column "user_uuid";

alter table "public"."chats" add column "user_id" uuid not null;

CREATE UNIQUE INDEX chats_project_uuid_user_id_disabled_at_idx ON public.chats USING btree (project_uuid, user_id, disabled_at);

alter table "public"."chats" add constraint "chats_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."chats" validate constraint "chats_user_id_fkey";

create policy "chats_select"
on "public"."chats"
as permissive
for select
to authenticated
using (((user_id = auth.uid()) AND (disabled_at IS NULL)));



