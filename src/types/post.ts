// frontmatter 里写的字段
export interface PostMeta {
  title: string;
  date: string; // 格式 YYYY-MM-DD
  description?: string;
  tags?: string[];
}

// 列表页用的数据：在 PostMeta 基础上加了 slug，可选字段都补上了默认值
export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}
