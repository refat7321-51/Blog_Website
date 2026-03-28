from django.contrib import admin
from .models import Post, Comment, Like, UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'location', 'website']
    search_fields = ['user__username', 'bio', 'location']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'created_date', 'total_likes', 'total_comments']
    list_filter = ['created_date', 'author']
    search_fields = ['title', 'content', 'author__username']
    date_hierarchy = 'created_date'
    ordering = ['-created_date']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author', 'post', 'created_date', 'content_preview']
    list_filter = ['created_date']
    search_fields = ['content', 'author__username', 'post__title']

    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['user', 'post', 'created_date']
    search_fields = ['user__username', 'post__title']


admin.site.site_header = 'Blog Administration'
admin.site.site_title = 'Blog Admin'
admin.site.index_title = 'Welcome to Blog Admin Panel'
