import { createSupabaseWithServiceRole } from "@/lib/supabase";
import { createToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const supabase = createSupabaseWithServiceRole();

  const projectUuid = searchParams.get("uid");

  const { data: projectDetails } = await supabase
    .from("project_details")
    .select("*")
    .eq("project_uuid", projectUuid)
    .single();

  if (!projectDetails) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const token = await createToken({
    sub: projectDetails.project_uuid,
  });

  return NextResponse.json({
    project: {
      team: { name: projectDetails.team_name },
      uuid: projectDetails.project_uuid,
    },
    token,
  });
}
