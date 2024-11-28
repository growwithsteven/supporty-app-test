drop policy "chats_select" on "public"."chats";

alter table "public"."chats" drop constraint "chats_user_id_fkey";

drop index if exists "public"."chats_project_uuid_user_id_disabled_at_idx";

alter table "public"."chats" drop column "user_id";

alter table "public"."chats" add column "user_uuid" uuid not null;

CREATE UNIQUE INDEX chats_project_uuid_user_uuid_disabled_at_idx ON public.chats USING btree (project_uuid, user_uuid, disabled_at);

create policy "chats_select"
on "public"."chats"
as permissive
for select
to authenticated
using (((user_uuid = auth.uid()) AND (disabled_at IS NULL)));



