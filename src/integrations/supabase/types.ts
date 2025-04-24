export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          icon_url: string | null
          id: string
          name: string
          xp_reward: number | null
        }
        Insert: {
          description: string
          icon_url?: string | null
          id?: string
          name: string
          xp_reward?: number | null
        }
        Update: {
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_streak: number | null
          id: string
          level: number | null
          longest_streak: number | null
          status: Database["public"]["Enums"]["user_status"] | null
          tasks_completed: number | null
          tasks_missed: number | null
          theme: string | null
          timezone: string | null
          total_points: number | null
          updated_at: string | null
          username: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          id: string
          level?: number | null
          longest_streak?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          tasks_completed?: number | null
          tasks_missed?: number | null
          theme?: string | null
          timezone?: string | null
          total_points?: number | null
          updated_at?: string | null
          username?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          id?: string
          level?: number | null
          longest_streak?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          tasks_completed?: number | null
          tasks_missed?: number | null
          theme?: string | null
          timezone?: string | null
          total_points?: number | null
          updated_at?: string | null
          username?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          created_at: string | null
          date: string
          day_rating: number | null
          id: string
          improve: string | null
          learned: string | null
          mood: Database["public"]["Enums"]["mood_type"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          day_rating?: number | null
          id?: string
          improve?: string | null
          learned?: string | null
          mood?: Database["public"]["Enums"]["mood_type"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          day_rating?: number | null
          id?: string
          improve?: string | null
          learned?: string | null
          mood?: Database["public"]["Enums"]["mood_type"] | null
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: Database["public"]["Enums"]["task_category"]
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          is_recurring: boolean | null
          points: number
          priority: Database["public"]["Enums"]["task_priority"]
          recurrence_pattern: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["task_category"]
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          is_recurring?: boolean | null
          points: number
          priority: Database["public"]["Enums"]["task_priority"]
          recurrence_pattern?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["task_category"]
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          is_recurring?: boolean | null
          points?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          recurrence_pattern?: string | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achieved_at: string | null
          achievement_id: string
          id: string
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          achievement_id: string
          id?: string
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          achievement_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          apple_calendar_connected: boolean | null
          created_at: string | null
          daily_reminder_time: string | null
          google_calendar_connected: boolean | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          apple_calendar_connected?: boolean | null
          created_at?: string | null
          daily_reminder_time?: string | null
          google_calendar_connected?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          apple_calendar_connected?: boolean | null
          created_at?: string | null
          daily_reminder_time?: string | null
          google_calendar_connected?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_points_for_priority: {
        Args: { priority: Database["public"]["Enums"]["task_priority"] }
        Returns: number
      }
    }
    Enums: {
      mood_type: "Great" | "Good" | "Neutral" | "Bad" | "Terrible"
      task_category:
        | "Work"
        | "Study"
        | "Fitness"
        | "Chores"
        | "Focus"
        | "Personal"
        | "Projects"
        | "Custom"
      task_priority: "Very High" | "High" | "Medium" | "Low" | "Optional"
      task_status:
        | "Pending"
        | "Completed"
        | "Completed Late"
        | "Postponed"
        | "Missed"
        | "Skipped"
        | "Canceled"
      user_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      mood_type: ["Great", "Good", "Neutral", "Bad", "Terrible"],
      task_category: [
        "Work",
        "Study",
        "Fitness",
        "Chores",
        "Focus",
        "Personal",
        "Projects",
        "Custom",
      ],
      task_priority: ["Very High", "High", "Medium", "Low", "Optional"],
      task_status: [
        "Pending",
        "Completed",
        "Completed Late",
        "Postponed",
        "Missed",
        "Skipped",
        "Canceled",
      ],
      user_status: ["active", "inactive", "suspended"],
    },
  },
} as const
