export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      agent_onboarding_applications: {
        Row: {
          advisor_notification_sent_at: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_section: number
          form_data: Json
          id: string
          resume_token: string
          signature: string | null
          signed_at: string | null
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          advisor_notification_sent_at?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_section?: number
          form_data?: Json
          id?: string
          resume_token?: string
          signature?: string | null
          signed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          advisor_notification_sent_at?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_section?: number
          form_data?: Json
          id?: string
          resume_token?: string
          signature?: string | null
          signed_at?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dynamic_advisors: {
        Row: {
          bio: string
          city: string
          created_at: string
          display_priority: number | null
          email: string
          id: string
          image_url: string | null
          licenses: string[]
          name: string
          passionate_bio: string | null
          phone: string
          pipedrive_user_id: number | null
          region: string
          rejection_reason: string | null
          scheduling_link: string | null
          slug: string
          specialties: string[]
          state: string
          status: Database["public"]["Enums"]["advisor_status"]
          title: string
          type: Database["public"]["Enums"]["advisor_type"]
          updated_at: string
          years_of_experience: number
        }
        Insert: {
          bio: string
          city: string
          created_at?: string
          display_priority?: number | null
          email: string
          id?: string
          image_url?: string | null
          licenses?: string[]
          name: string
          passionate_bio?: string | null
          phone: string
          pipedrive_user_id?: number | null
          region: string
          rejection_reason?: string | null
          scheduling_link?: string | null
          slug: string
          specialties?: string[]
          state: string
          status?: Database["public"]["Enums"]["advisor_status"]
          title: string
          type?: Database["public"]["Enums"]["advisor_type"]
          updated_at?: string
          years_of_experience?: number
        }
        Update: {
          bio?: string
          city?: string
          created_at?: string
          display_priority?: number | null
          email?: string
          id?: string
          image_url?: string | null
          licenses?: string[]
          name?: string
          passionate_bio?: string | null
          phone?: string
          pipedrive_user_id?: number | null
          region?: string
          rejection_reason?: string | null
          scheduling_link?: string | null
          slug?: string
          specialties?: string[]
          state?: string
          status?: Database["public"]["Enums"]["advisor_status"]
          title?: string
          type?: Database["public"]["Enums"]["advisor_type"]
          updated_at?: string
          years_of_experience?: number
        }
        Relationships: []
      }
      estate_planning_applications: {
        Row: {
          advisor_email: string | null
          advisor_id: string | null
          advisor_name: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_step: number
          form_data: Json
          id: string
          source_url: string | null
          spouse_name: string | null
          status: Database["public"]["Enums"]["estate_planning_status"]
          submitted_at: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          source_url?: string | null
          spouse_name?: string | null
          status?: Database["public"]["Enums"]["estate_planning_status"]
          submitted_at?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          source_url?: string | null
          spouse_name?: string | null
          status?: Database["public"]["Enums"]["estate_planning_status"]
          submitted_at?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      event_submissions: {
        Row: {
          agent_email: string
          agent_name: string
          agent_phone: string | null
          created_at: string | null
          description: string
          enable_rsvp: boolean | null
          end_time: string
          event_name: string
          id: string
          location: string
          max_attendees: number | null
          notes: string | null
          primary_image_url: string | null
          rsvp_email: string | null
          short_description: string
          start_time: string
          status: string | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          agent_email: string
          agent_name: string
          agent_phone?: string | null
          created_at?: string | null
          description: string
          enable_rsvp?: boolean | null
          end_time: string
          event_name: string
          id?: string
          location: string
          max_attendees?: number | null
          notes?: string | null
          primary_image_url?: string | null
          rsvp_email?: string | null
          short_description: string
          start_time: string
          status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_email?: string
          agent_name?: string
          agent_phone?: string | null
          created_at?: string | null
          description?: string
          enable_rsvp?: boolean | null
          end_time?: string
          event_name?: string
          id?: string
          location?: string
          max_attendees?: number | null
          notes?: string | null
          primary_image_url?: string | null
          rsvp_email?: string | null
          short_description?: string
          start_time?: string
          status?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          advisor: string | null
          advisor_slug: string | null
          created_at: string | null
          email: string | null
          email_sent: boolean | null
          error_message: string | null
          first_name: string | null
          form_data: Json
          form_type: string
          id: string
          last_name: string | null
          name: string | null
          notes: string | null
          partner: string | null
          partner_slug: string | null
          phone: string | null
          pipedrive_lead_id: string | null
          pipedrive_org_id: number | null
          pipedrive_owner_id: number | null
          pipedrive_person_id: number | null
          preferred_language: string | null
          routing_result: string | null
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          source: string | null
          source_url: string | null
          state_location: string | null
          status: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          advisor?: string | null
          advisor_slug?: string | null
          created_at?: string | null
          email?: string | null
          email_sent?: boolean | null
          error_message?: string | null
          first_name?: string | null
          form_data: Json
          form_type: string
          id?: string
          last_name?: string | null
          name?: string | null
          notes?: string | null
          partner?: string | null
          partner_slug?: string | null
          phone?: string | null
          pipedrive_lead_id?: string | null
          pipedrive_org_id?: number | null
          pipedrive_owner_id?: number | null
          pipedrive_person_id?: number | null
          preferred_language?: string | null
          routing_result?: string | null
          sms_consent?: boolean
          sms_consent_at?: string | null
          sms_consent_text_version?: string | null
          source?: string | null
          source_url?: string | null
          state_location?: string | null
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          advisor?: string | null
          advisor_slug?: string | null
          created_at?: string | null
          email?: string | null
          email_sent?: boolean | null
          error_message?: string | null
          first_name?: string | null
          form_data?: Json
          form_type?: string
          id?: string
          last_name?: string | null
          name?: string | null
          notes?: string | null
          partner?: string | null
          partner_slug?: string | null
          phone?: string | null
          pipedrive_lead_id?: string | null
          pipedrive_org_id?: number | null
          pipedrive_owner_id?: number | null
          pipedrive_person_id?: number | null
          preferred_language?: string | null
          routing_result?: string | null
          sms_consent?: boolean
          sms_consent_at?: string | null
          sms_consent_text_version?: string | null
          source?: string | null
          source_url?: string | null
          state_location?: string | null
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      intake_consent_log: {
        Row: {
          agent_user_id: string | null
          consent_text_snapshot: string
          consent_text_version: string
          consent_type: string
          id: string
          ip: string | null
          language: string
          lead_id: string | null
          occurred_at: string
          page_url: string | null
          user_agent: string | null
        }
        Insert: {
          agent_user_id?: string | null
          consent_text_snapshot: string
          consent_text_version: string
          consent_type: string
          id?: string
          ip?: string | null
          language?: string
          lead_id?: string | null
          occurred_at?: string
          page_url?: string | null
          user_agent?: string | null
        }
        Update: {
          agent_user_id?: string | null
          consent_text_snapshot?: string
          consent_text_version?: string
          consent_type?: string
          id?: string
          ip?: string | null
          language?: string
          lead_id?: string | null
          occurred_at?: string
          page_url?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_consent_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "intake_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_leads: {
        Row: {
          answers: Json
          appointment_at: string | null
          appointment_status: string | null
          assigned_member_id: string | null
          attribution_path: string[]
          best_time: string | null
          conversation_sid: string | null
          created_at: string
          created_by: string | null
          email: string | null
          email_normalized: string | null
          first_name: string | null
          ghl_forward_attempts: number
          ghl_forward_status: string
          ghl_forwarded_at: string | null
          ghl_last_error: string | null
          hold_automation: boolean
          id: string
          intro_fallback: boolean
          intro_scheduled_for: string | null
          intro_sent_at: string | null
          language: string
          last_name: string | null
          origin_referrer_id: string | null
          phone_e164: string | null
          phone_normalized: string | null
          preferred_contact_at: string | null
          primary_service: string | null
          referrer_id: string | null
          referrer_in_thread: boolean
          resume_token: string
          routing_overridden: boolean
          routing_reason: string | null
          routing_team_key: string | null
          services: string[]
          sms_status: string
          source: string
          speaking_with: string | null
          staff_notes: string | null
          status: string
          temperature: string | null
          timezone: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          answers?: Json
          appointment_at?: string | null
          appointment_status?: string | null
          assigned_member_id?: string | null
          attribution_path?: string[]
          best_time?: string | null
          conversation_sid?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          email_normalized?: string | null
          first_name?: string | null
          ghl_forward_attempts?: number
          ghl_forward_status?: string
          ghl_forwarded_at?: string | null
          ghl_last_error?: string | null
          hold_automation?: boolean
          id?: string
          intro_fallback?: boolean
          intro_scheduled_for?: string | null
          intro_sent_at?: string | null
          language?: string
          last_name?: string | null
          origin_referrer_id?: string | null
          phone_e164?: string | null
          phone_normalized?: string | null
          preferred_contact_at?: string | null
          primary_service?: string | null
          referrer_id?: string | null
          referrer_in_thread?: boolean
          resume_token?: string
          routing_overridden?: boolean
          routing_reason?: string | null
          routing_team_key?: string | null
          services?: string[]
          sms_status?: string
          source: string
          speaking_with?: string | null
          staff_notes?: string | null
          status?: string
          temperature?: string | null
          timezone?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          answers?: Json
          appointment_at?: string | null
          appointment_status?: string | null
          assigned_member_id?: string | null
          attribution_path?: string[]
          best_time?: string | null
          conversation_sid?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          email_normalized?: string | null
          first_name?: string | null
          ghl_forward_attempts?: number
          ghl_forward_status?: string
          ghl_forwarded_at?: string | null
          ghl_last_error?: string | null
          hold_automation?: boolean
          id?: string
          intro_fallback?: boolean
          intro_scheduled_for?: string | null
          intro_sent_at?: string | null
          language?: string
          last_name?: string | null
          origin_referrer_id?: string | null
          phone_e164?: string | null
          phone_normalized?: string | null
          preferred_contact_at?: string | null
          primary_service?: string | null
          referrer_id?: string | null
          referrer_in_thread?: boolean
          resume_token?: string
          routing_overridden?: boolean
          routing_reason?: string | null
          routing_team_key?: string | null
          services?: string[]
          sms_status?: string
          source?: string
          speaking_with?: string | null
          staff_notes?: string | null
          status?: string
          temperature?: string | null
          timezone?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intake_leads_assigned_member_id_fkey"
            columns: ["assigned_member_id"]
            isOneToOne: false
            referencedRelation: "intake_team_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intake_leads_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "intake_referrers"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_referrers: {
        Row: {
          active: boolean
          agreement_signed_at: string | null
          avatar_url: string | null
          brand_accent_hex: string | null
          brand_logo_url: string | null
          brand_primary_hex: string | null
          brand_support_email: string | null
          brand_welcome_body: string | null
          brand_welcome_headline: string | null
          created_at: string
          depth: number
          display_name: string
          id: string
          owner_user_id: string | null
          parent_referrer_id: string | null
          phone_e164: string | null
          slug: string
          sms_notify_optin: boolean
          updated_at: string
        }
        Insert: {
          active?: boolean
          agreement_signed_at?: string | null
          avatar_url?: string | null
          brand_accent_hex?: string | null
          brand_logo_url?: string | null
          brand_primary_hex?: string | null
          brand_support_email?: string | null
          brand_welcome_body?: string | null
          brand_welcome_headline?: string | null
          created_at?: string
          depth?: number
          display_name: string
          id?: string
          owner_user_id?: string | null
          parent_referrer_id?: string | null
          phone_e164?: string | null
          slug: string
          sms_notify_optin?: boolean
          updated_at?: string
        }
        Update: {
          active?: boolean
          agreement_signed_at?: string | null
          avatar_url?: string | null
          brand_accent_hex?: string | null
          brand_logo_url?: string | null
          brand_primary_hex?: string | null
          brand_support_email?: string | null
          brand_welcome_body?: string | null
          brand_welcome_headline?: string | null
          created_at?: string
          depth?: number
          display_name?: string
          id?: string
          owner_user_id?: string | null
          parent_referrer_id?: string | null
          phone_e164?: string | null
          slug?: string
          sms_notify_optin?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_referrers_parent_referrer_id_fkey"
            columns: ["parent_referrer_id"]
            isOneToOne: false
            referencedRelation: "intake_referrers"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_sms_events: {
        Row: {
          author: string | null
          body: string | null
          conversation_sid: string | null
          direction: string | null
          event_type: string | null
          id: string
          lead_id: string | null
          needs_review: boolean
          occurred_at: string
          raw: Json | null
          severity: string
        }
        Insert: {
          author?: string | null
          body?: string | null
          conversation_sid?: string | null
          direction?: string | null
          event_type?: string | null
          id?: string
          lead_id?: string | null
          needs_review?: boolean
          occurred_at?: string
          raw?: Json | null
          severity?: string
        }
        Update: {
          author?: string | null
          body?: string | null
          conversation_sid?: string | null
          direction?: string | null
          event_type?: string | null
          id?: string
          lead_id?: string | null
          needs_review?: boolean
          occurred_at?: string
          raw?: Json | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_sms_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "intake_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_sms_templates: {
        Row: {
          body: string
          created_at: string
          id: string
          kind: string
          language: string
          team_key: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          kind?: string
          language: string
          team_key: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          language?: string
          team_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      intake_suppressions: {
        Row: {
          id: string
          occurred_at: string
          phone_e164: string
          reason: string
        }
        Insert: {
          id?: string
          occurred_at?: string
          phone_e164: string
          reason?: string
        }
        Update: {
          id?: string
          occurred_at?: string
          phone_e164?: string
          reason?: string
        }
        Relationships: []
      }
      intake_team_members: {
        Row: {
          active: boolean
          calendar_link: string | null
          created_at: string
          id: string
          language_capabilities: string[]
          name: string
          open_lead_count: number
          phone_e164: string
          priority: number
          team_key: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          calendar_link?: string | null
          created_at?: string
          id?: string
          language_capabilities?: string[]
          name: string
          open_lead_count?: number
          phone_e164: string
          priority?: number
          team_key: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          calendar_link?: string | null
          created_at?: string
          id?: string
          language_capabilities?: string[]
          name?: string
          open_lead_count?: number
          phone_e164?: string
          priority?: number
          team_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_team_members_team_key_fkey"
            columns: ["team_key"]
            isOneToOne: false
            referencedRelation: "intake_teams"
            referencedColumns: ["key"]
          },
        ]
      }
      intake_teams: {
        Row: {
          created_at: string
          id: string
          key: string
          language_capabilities: string[]
          member_name: string | null
          name_en: string
          name_es: string
          scheduling_url: string | null
          scheduling_url_es: string | null
          twilio_projected_address: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          language_capabilities?: string[]
          member_name?: string | null
          name_en: string
          name_es: string
          scheduling_url?: string | null
          scheduling_url_es?: string | null
          twilio_projected_address?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          language_capabilities?: string[]
          member_name?: string | null
          name_en?: string
          name_es?: string
          scheduling_url?: string | null
          scheduling_url_es?: string | null
          twilio_projected_address?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          admin_notes: string | null
          consent_at: string | null
          consent_text: string | null
          created_at: string
          email: string | null
          first_name: string | null
          funnel: string
          id: string
          is_complete: boolean
          landing_page: string | null
          last_name: string | null
          last_step: number | null
          partner_slug: string | null
          payload: Json
          phone: string | null
          referral_source: string | null
          resume_token: string
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          state: string | null
          status: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          admin_notes?: string | null
          consent_at?: string | null
          consent_text?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          funnel: string
          id?: string
          is_complete?: boolean
          landing_page?: string | null
          last_name?: string | null
          last_step?: number | null
          partner_slug?: string | null
          payload?: Json
          phone?: string | null
          referral_source?: string | null
          resume_token?: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          sms_consent_text_version?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          admin_notes?: string | null
          consent_at?: string | null
          consent_text?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          funnel?: string
          id?: string
          is_complete?: boolean
          landing_page?: string | null
          last_name?: string | null
          last_step?: number | null
          partner_slug?: string | null
          payload?: Json
          phone?: string | null
          referral_source?: string | null
          resume_token?: string
          sms_consent?: boolean
          sms_consent_at?: string | null
          sms_consent_text_version?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      life_insurance_applications: {
        Row: {
          admin_notification_sent_at: string | null
          advisor_email: string | null
          advisor_id: string | null
          advisor_name: string | null
          advisor_notification_sent_at: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_step: number
          form_data: Json
          id: string
          last_notification_error: string | null
          notification_attempts: number
          product_type: string
          resume_email: string | null
          resume_token: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
        }
        Insert: {
          admin_notification_sent_at?: string | null
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          advisor_notification_sent_at?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          last_notification_error?: string | null
          notification_attempts?: number
          product_type?: string
          resume_email?: string | null
          resume_token?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Update: {
          admin_notification_sent_at?: string | null
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          advisor_notification_sent_at?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          last_notification_error?: string | null
          notification_attempts?: number
          product_type?: string
          resume_email?: string | null
          resume_token?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Relationships: []
      }
      pipedrive_custom_fields: {
        Row: {
          created_at: string | null
          entity_type: string
          field_name: string
          id: string
          pipedrive_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entity_type: string
          field_name: string
          id?: string
          pipedrive_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entity_type?: string
          field_name?: string
          id?: string
          pipedrive_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prequalification_applications: {
        Row: {
          advisor_email: string | null
          advisor_id: string | null
          advisor_name: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_step: number
          form_data: Json
          id: string
          source_url: string | null
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          source_url?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          advisor_email?: string | null
          advisor_id?: string | null
          advisor_name?: string | null
          applicant_email?: string | null
          applicant_name?: string | null
          applicant_phone?: string | null
          created_at?: string
          current_step?: number
          form_data?: Json
          id?: string
          source_url?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resource_categories: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          id: string
          mime_type: string
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number
          id?: string
          mime_type?: string
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          mime_type?: string
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsorship_events: {
        Row: {
          atmosphere: string | null
          attendees: string
          created_at: string | null
          description: string
          display_order: number
          event_date: string | null
          gradient: string
          icon: string
          id: string
          is_active: boolean
          name: string
          slug: string
          status: string
          timing: string
          updated_at: string | null
        }
        Insert: {
          atmosphere?: string | null
          attendees?: string
          created_at?: string | null
          description: string
          display_order?: number
          event_date?: string | null
          gradient?: string
          icon?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          status?: string
          timing: string
          updated_at?: string | null
        }
        Update: {
          atmosphere?: string | null
          attendees?: string
          created_at?: string | null
          description?: string
          display_order?: number
          event_date?: string | null
          gradient?: string
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          status?: string
          timing?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sponsorship_leads: {
        Row: {
          company_name: string
          contact_name: string
          created_at: string | null
          email: string
          id: string
          industry: string
          logo_url: string | null
          needs_power_internet: boolean | null
          notes: string | null
          phone: string
          promotion_details: string | null
          source_url: string | null
          sponsorship_package: string
          status: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          website_social: string | null
        }
        Insert: {
          company_name: string
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          industry: string
          logo_url?: string | null
          needs_power_internet?: boolean | null
          notes?: string | null
          phone: string
          promotion_details?: string | null
          source_url?: string | null
          sponsorship_package: string
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          website_social?: string | null
        }
        Update: {
          company_name?: string
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          industry?: string
          logo_url?: string | null
          needs_power_internet?: boolean | null
          notes?: string | null
          phone?: string
          promotion_details?: string | null
          source_url?: string | null
          sponsorship_package?: string
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          website_social?: string | null
        }
        Relationships: []
      }
      sponsorship_tiers: {
        Row: {
          created_at: string | null
          display_order: number
          features: string[]
          highlight: string | null
          id: string
          is_active: boolean
          is_popular: boolean | null
          name: string
          price: number
          price_note: string
          stripe_price_id: string | null
          tier_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          features?: string[]
          highlight?: string | null
          id?: string
          is_active?: boolean
          is_popular?: boolean | null
          name: string
          price: number
          price_note?: string
          stripe_price_id?: string | null
          tier_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number
          features?: string[]
          highlight?: string | null
          id?: string
          is_active?: boolean
          is_popular?: boolean | null
          name?: string
          price?: number
          price_note?: string
          stripe_price_id?: string | null
          tier_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_advisors: {
        Row: {
          bio: string | null
          city: string | null
          created_at: string | null
          display_priority: number | null
          id: string | null
          image_url: string | null
          licenses: string[] | null
          name: string | null
          passionate_bio: string | null
          region: string | null
          scheduling_link: string | null
          specialties: string[] | null
          state: string | null
          status: Database["public"]["Enums"]["advisor_status"] | null
          title: string | null
          type: Database["public"]["Enums"]["advisor_type"] | null
          updated_at: string | null
          years_of_experience: number | null
        }
        Insert: {
          bio?: string | null
          city?: string | null
          created_at?: string | null
          display_priority?: number | null
          id?: string | null
          image_url?: string | null
          licenses?: string[] | null
          name?: string | null
          passionate_bio?: string | null
          region?: string | null
          scheduling_link?: string | null
          specialties?: string[] | null
          state?: string | null
          status?: Database["public"]["Enums"]["advisor_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["advisor_type"] | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Update: {
          bio?: string | null
          city?: string | null
          created_at?: string | null
          display_priority?: number | null
          id?: string | null
          image_url?: string | null
          licenses?: string[] | null
          name?: string | null
          passionate_bio?: string | null
          region?: string | null
          scheduling_link?: string | null
          specialties?: string[] | null
          state?: string | null
          status?: Database["public"]["Enums"]["advisor_status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["advisor_type"] | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_bulk_upsert_referrers: { Args: { p_rows: Json }; Returns: Json }
      admin_delete_referrer: { Args: { p_id: string }; Returns: undefined }
      admin_get_sponsorship_tiers: {
        Args: never
        Returns: {
          created_at: string | null
          display_order: number
          features: string[]
          highlight: string | null
          id: string
          is_active: boolean
          is_popular: boolean | null
          name: string
          price: number
          price_note: string
          stripe_price_id: string | null
          tier_id: string
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "sponsorship_tiers"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_link_referrer_owner: {
        Args: { p_email: string; p_referrer_id: string }
        Returns: string
      }
      admin_list_partner_form_submissions: {
        Args: { p_slug: string }
        Returns: {
          advisor: string | null
          advisor_slug: string | null
          created_at: string | null
          email: string | null
          email_sent: boolean | null
          error_message: string | null
          first_name: string | null
          form_data: Json
          form_type: string
          id: string
          last_name: string | null
          name: string | null
          notes: string | null
          partner: string | null
          partner_slug: string | null
          phone: string | null
          pipedrive_lead_id: string | null
          pipedrive_org_id: number | null
          pipedrive_owner_id: number | null
          pipedrive_person_id: number | null
          preferred_language: string | null
          routing_result: string | null
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          source: string | null
          source_url: string | null
          state_location: string | null
          status: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "form_submissions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_list_partner_leads: {
        Args: { p_slug: string }
        Returns: {
          admin_notes: string | null
          consent_at: string | null
          consent_text: string | null
          created_at: string
          email: string | null
          first_name: string | null
          funnel: string
          id: string
          is_complete: boolean
          landing_page: string | null
          last_name: string | null
          last_step: number | null
          partner_slug: string | null
          payload: Json
          phone: string | null
          referral_source: string | null
          resume_token: string
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          state: string | null
          status: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "leads"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      admin_list_referrers_with_owner: {
        Args: never
        Returns: {
          active: boolean
          agreement_signed_at: string
          avatar_url: string
          brand_accent_hex: string
          brand_logo_url: string
          brand_primary_hex: string
          brand_support_email: string
          brand_welcome_body: string
          brand_welcome_headline: string
          created_at: string
          depth: number
          display_name: string
          id: string
          leads_30d: number
          leads_total: number
          owner_email: string
          owner_user_id: string
          parent_referrer_id: string
          parent_slug: string
          phone_e164: string
          slug: string
          sms_notify_optin: boolean
          updated_at: string
        }[]
      }
      admin_partner_stats: {
        Args: { p_include_descendants?: boolean; p_referrer_id: string }
        Returns: Json
      }
      admin_unlink_referrer_owner: {
        Args: { p_referrer_id: string }
        Returns: undefined
      }
      admin_upsert_referrer: {
        Args: {
          p_active: boolean
          p_avatar_url: string
          p_brand_accent_hex?: string
          p_brand_logo_url?: string
          p_brand_primary_hex?: string
          p_brand_support_email?: string
          p_brand_welcome_body?: string
          p_brand_welcome_headline?: string
          p_display_name: string
          p_id: string
          p_parent_referrer_id?: string
          p_phone_e164: string
          p_slug: string
          p_sms_notify_optin: boolean
        }
        Returns: string
      }
      create_agent_onboarding_draft: {
        Args: never
        Returns: {
          id: string
          resume_token: string
        }[]
      }
      generate_advisor_slug: { Args: { advisor_name: string }; Returns: string }
      get_advisor_by_slug: {
        Args: { advisor_slug: string }
        Returns: {
          id: string
          image_url: string
          name: string
          scheduling_link: string
          title: string
        }[]
      }
      get_agent_onboarding_by_token: {
        Args: { p_resume_token: string }
        Returns: {
          advisor_notification_sent_at: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_section: number
          form_data: Json
          id: string
          resume_token: string
          signature: string | null
          signed_at: string | null
          status: string
          submitted_at: string | null
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "agent_onboarding_applications"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_draft_application_by_token: {
        Args: { p_resume_token: string }
        Returns: {
          admin_notification_sent_at: string | null
          advisor_email: string | null
          advisor_id: string | null
          advisor_name: string | null
          advisor_notification_sent_at: string | null
          applicant_email: string | null
          applicant_name: string | null
          applicant_phone: string | null
          created_at: string
          current_step: number
          form_data: Json
          id: string
          last_notification_error: string | null
          notification_attempts: number
          product_type: string
          resume_email: string | null
          resume_token: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "life_insurance_applications"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_intake_referrer_by_slug: {
        Args: { p_slug: string }
        Returns: {
          avatar_url: string
          display_name: string
          id: string
          slug: string
        }[]
      }
      get_my_partner_branding: {
        Args: never
        Returns: {
          brand_accent_hex: string
          brand_logo_url: string
          brand_primary_hex: string
          brand_support_email: string
          brand_welcome_body: string
          brand_welcome_headline: string
          depth: number
          display_name: string
          id: string
          parent_referrer_id: string
          slug: string
        }[]
      }
      get_my_referrer_id: { Args: never; Returns: string }
      get_partner_owner_email_by_slug: {
        Args: { _slug: string }
        Returns: string
      }
      get_public_advisors: {
        Args: never
        Returns: {
          bio: string
          city: string
          created_at: string
          display_priority: number
          id: string
          image_url: string
          licenses: string[]
          name: string
          passionate_bio: string
          region: string
          scheduling_link: string
          specialties: string[]
          state: string
          status: Database["public"]["Enums"]["advisor_status"]
          title: string
          type: Database["public"]["Enums"]["advisor_type"]
          updated_at: string
          years_of_experience: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      intake_assign_member: {
        Args: { p_language: string; p_team_key: string }
        Returns: {
          member_id: string
          member_name: string
          member_phone: string
          scheduling_link: string
          was_language_preferred: boolean
        }[]
      }
      is_my_partner_slug: { Args: { _slug: string }; Returns: boolean }
      partner_list_children: {
        Args: { p_referrer_id?: string }
        Returns: {
          active: boolean
          depth: number
          display_name: string
          id: string
          leads_30d: number
          leads_total: number
          slug: string
        }[]
      }
      partner_list_my_form_submissions: {
        Args: never
        Returns: {
          advisor: string | null
          advisor_slug: string | null
          created_at: string | null
          email: string | null
          email_sent: boolean | null
          error_message: string | null
          first_name: string | null
          form_data: Json
          form_type: string
          id: string
          last_name: string | null
          name: string | null
          notes: string | null
          partner: string | null
          partner_slug: string | null
          phone: string | null
          pipedrive_lead_id: string | null
          pipedrive_org_id: number | null
          pipedrive_owner_id: number | null
          pipedrive_person_id: number | null
          preferred_language: string | null
          routing_result: string | null
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          source: string | null
          source_url: string | null
          state_location: string | null
          status: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "form_submissions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      partner_list_my_leads: {
        Args: never
        Returns: {
          admin_notes: string | null
          consent_at: string | null
          consent_text: string | null
          created_at: string
          email: string | null
          first_name: string | null
          funnel: string
          id: string
          is_complete: boolean
          landing_page: string | null
          last_name: string | null
          last_step: number | null
          partner_slug: string | null
          payload: Json
          phone: string | null
          referral_source: string | null
          resume_token: string
          sms_consent: boolean
          sms_consent_at: string | null
          sms_consent_text_version: string | null
          state: string | null
          status: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "leads"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      submit_agent_onboarding_application: {
        Args: {
          p_application_id: string
          p_resume_token: string
          p_signature: string
        }
        Returns: undefined
      }
      submit_life_insurance_application: {
        Args: { application_id: string }
        Returns: undefined
      }
      update_agent_onboarding_by_token: {
        Args: {
          p_applicant_email?: string
          p_applicant_name?: string
          p_applicant_phone?: string
          p_current_section: number
          p_form_data: Json
          p_resume_token: string
        }
        Returns: string
      }
      update_draft_application_by_token: {
        Args: {
          p_applicant_email?: string
          p_applicant_name?: string
          p_applicant_phone?: string
          p_current_step: number
          p_form_data: Json
          p_resume_token: string
        }
        Returns: string
      }
    }
    Enums: {
      advisor_status: "pending" | "published" | "hidden" | "archived"
      advisor_type: "Advisor" | "Broker"
      app_role: "admin" | "moderator" | "user" | "staff" | "partner"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "needs_info"
        | "rejected"
      estate_planning_status: "draft" | "submitted" | "in_review" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      advisor_status: ["pending", "published", "hidden", "archived"],
      advisor_type: ["Advisor", "Broker"],
      app_role: ["admin", "moderator", "user", "staff", "partner"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "needs_info",
        "rejected",
      ],
      estate_planning_status: ["draft", "submitted", "in_review", "completed"],
    },
  },
} as const
