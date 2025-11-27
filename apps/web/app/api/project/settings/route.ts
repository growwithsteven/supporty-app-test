import { NextResponse, NextRequest } from 'next/server'
import { createSupabaseWithServiceRole } from '@/lib/supabase'
import { verifyTokenFromAuthorization } from '@/lib/token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function PUT(req: NextRequest) {
    const settings = await req.json()
    const supabase = createSupabaseWithServiceRole()
    const { sub: projectUuid } = await verifyTokenFromAuthorization(
        req.headers.get('Authorization'),
    )

    const { data: projectDetails } = await supabase
        .from('project_details')
        .update({
            settings,
        })
        .eq('project_uuid', projectUuid)
        .select('*')
        .single()

    return NextResponse.json(projectDetails)
}
