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
          phone: string | null
          pipedrive_lead_id: string | null
          pipedrive_org_id: number | null
          pipedrive_owner_id: number | null
          pipedrive_person_id: number | null
          preferred_language: string | null
          routing_result: string | null
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
          phone?: string | null
          pipedrive_lead_id?: string | null
          pipedrive_org_id?: number | null
          pipedrive_owner_id?: number | null
          pipedrive_person_id?: number | null
          preferred_language?: string | null
          routing_result?: string | null
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
          phone?: string | null
          pipedrive_lead_id?: string | null
          pipedrive_org_id?: number | null
          pipedrive_owner_id?: number | null
          pipedrive_person_id?: number | null
          preferred_language?: string | null
          routing_result?: string | null
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
      life_insurance_applications: {
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
          resume_email: string | null
          resume_token: string | null
          status: Database["public"]["Enums"]["application_status"]
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
          resume_email?: string | null
          resume_token?: string | null
          status?: Database["public"]["Enums"]["application_status"]
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
      generate_advisor_slug: { Args: { advisor_name: string }; Returns: string }
      get_advisor_by_slug: {
        Args: { advisor_slug: string }
        Returns: {
          email: string
          id: string
          image_url: string
          name: string
          scheduling_link: string
          title: string
        }[]
      }
      get_draft_application_by_token: {
        Args: { p_resume_token: string }
        Returns: {
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
      submit_life_insurance_application: {
        Args: { application_id: string }
        Returns: undefined
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
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
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
