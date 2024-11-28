create policy "project_details_select"
on "public"."project_details"
as permissive
for select
to public
using (true);



