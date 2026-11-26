const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (findError) throw findError;

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || null,
      })
      .select('id, name, email, phone, created_at')
      .single();

    if (error) throw error;

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
      token,
    });

  } catch (error) {
    next(error);
  }
};

// Login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (error) throw error;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);

    const { password: hiddenPassword, ...safeUser } = user;

    return res.json({
      success: true,
      message: 'Login successful',
      user: safeUser,
      token,
    });

  } catch (error) {
    next(error);
  }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, phone, created_at')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};