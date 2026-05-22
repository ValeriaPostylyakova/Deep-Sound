from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
		first_name = models.CharField(max_length=100, blank=True, null=True)
		last_name = models.CharField(max_length=150, blank=True, null=True)
		email = models.EmailField(unique=True)
		password = models.CharField(max_length=255)
		avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
  
		is_active = models.BooleanField(default=True)
  
		created_at = models.DateTimeField(auto_now_add=True)
		updated_at = models.DateTimeField(auto_now=True)
  
		USERNAME_FIELD = 'email'
		REQUIRED_FIELDS = ['username']
  
		def __str__(self):
				return self.email
  
		@property
		def get_full_name(self):
				return f'{self.first_name} {self.last_name}'.strip()
  
