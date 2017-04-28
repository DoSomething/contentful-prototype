<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use DoSomething\Gateway\Laravel\HasNorthstarToken;
use DoSomething\Gateway\Contracts\NorthstarUserContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Model implements AuthenticatableContract, NorthstarUserContract
{
    use Authenticatable, HasNorthstarToken;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'northstar_id';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'northstar_id';
    }

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->getAttribute($this->getAuthIdentifierName());
    }

    /**
     * Is this user a staff member?
     *
     * @return bool
     */
    public function isStaff()
    {
        return in_array($this->role, ['staff', 'admin']);
    }
}
