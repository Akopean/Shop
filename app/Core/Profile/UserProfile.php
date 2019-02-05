<?php

namespace App\Core\Profile;

use App\Core\Users\User;
use Illuminate\Database\Eloquent\Model;
use Laravolt\Avatar\Facade as Avatar;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\Models\Media;

class UserProfile extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $table = 'user_profile';

    protected $fillable = ['avatar'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function avatar()
    {
        return $this->hasOne(Media::class, 'id', 'avatar_id');
    }

    public function getAvatarUrlAttribute()
    {
        if (!$this->avatar->getUrl('thumb')) {
            return $this->avatar->getUrl('thumb');
        }

        return Avatar::create('Avatar')->toBase64();
    }

    public function registerMediaCollections()
    {
        $this
            ->addMediaCollection('user_avatars')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(60)
                    ->height(60);
            });
    }
}
