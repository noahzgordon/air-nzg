class User < ActiveRecord::Base
  has_many :listings
  has_many :bookings
  
  has_many :booking_requests, through: :listings, source: :bookings
  has_many :notifications, inverse_of: :user, counter_cache: true
  
  has_attached_file(
    :avatar, 
    styles: { thumb: "50x50#", small: "100x100#", medium: "200x200#" },
    default_url: "/images/missing_:style.png"
  )
  
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :email, :password_digest, presence: true, uniqueness: true
  validates :fname, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  before_save :ensure_session_token

  def self.generate_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    user && user.is_password?(password) ? user : nil
  end
  
  def self.find_by_auth_hash(auth_hash)
    User.find_by(uid: auth_hash[:uid], provider: auth_hash[:provider])
  end
  
  def self.create_by_auth_hash(auth_hash)
    User.create!(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider],
      email: auth_hash[:info][:email],
      fname: auth_hash[:info][:first_name],
      lname: auth_hash[:info][:last_name],
      avatar: process_uri(auth_hash[:info][:image]),
      locale: auth_hash[:info][:location],
      password: SecureRandom.urlsafe_base64(8)
    )
  end
  
  def self.process_uri(uri)
    open(uri, :allow_redirections => :safe) do |r|
      r.base_uri.to_s
    end
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!

    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_token
  end
  
  
end
