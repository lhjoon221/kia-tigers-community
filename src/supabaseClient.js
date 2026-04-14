// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqtmjllsrxejgdeukeqx.supabase.co'
const supabaseAnonKey = 'sb_publishable_ixMtJI0GOAblQSd7qpVq5Q_zrAaGT2p'

// 반드시 export를 해줘야 다른 파일에서 import 할 수 있어요!
export const supabase = createClient(supabaseUrl, supabaseAnonKey)