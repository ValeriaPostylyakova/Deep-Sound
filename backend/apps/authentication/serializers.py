from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator
from django.contrib.auth import authenticate

from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(
   write_only=True, 
   validators=[validate_password, 
               MinLengthValidator(8, message="Слишком короткий пароль. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.")])
 
	confirm_password = serializers.CharField(write_only=True)
  
	class Meta:
		model = User
		fields = ('email', 'password', 'username', 'avatar', 'is_active', 'created_at', 'updated_at', 'confirm_password')
		read_only_fields = ('created_at', 'updated_at')
  
	def validate(self, data):
		if data['password'] != data['confirm_password']:
			raise serializers.ValidationError({
				"message": "Пароли не совпадают. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз."
			})
		return data

	def create(self, validated_data):
		validated_data.pop('confirm_password')
		return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(write_only=True)
  
  def validate(self, data):
    email = data.get('email')
    password = data.get('password')
    
    if email and password:
      user = authenticate(
        request=self.context.get('request'),
        username=email,
        password=password
      )
      
      if not user:
        raise serializers.ValidationError({
          "message": "Неправильный логин или пароль. Пожалуйста, проверьте правильность ввода данных и попробуйте ещё раз или зарегистрируйтесь."
        })
        
      data['user'] = user
      
      if not user.is_active:
        raise serializers.ValidationError({
          "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
        })
      
    else:
      raise serializers.ValidationError({
        "message": "Пожалуйста, введите данные для входа."
      })
      
    return data
  
class UserReadSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'username', 
            'full_name', 'avatar', 'is_active', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
  
    def get_full_name(self, obj):
        return obj.get_full_name
  
  
  
class UserWriteSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=False, 
        validators=[MinLengthValidator(3, message="Слишком короткое имя. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.")]
    )
    last_name = serializers.CharField(
        required=False, 
        validators=[MinLengthValidator(3, message="Слишком короткая фамилия. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.")]
    )
 
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'avatar')
        
    def validate(self, data):
        user = self.context.get('request').user
        if not user.is_active:
            raise serializers.ValidationError({
              "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
            })
        return data

        
       
  
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Пользователь с таким email не найден."
            )
        return value

		
  
  
  
  
 
 